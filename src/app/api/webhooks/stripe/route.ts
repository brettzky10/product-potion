import prismadb from "@/lib/db/prismadb";
import {stripe} from "@/lib/stripe";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { toast } from "sonner";
import Stripe from "stripe";

export async function POST(req: NextRequest) {
  const body = await req.text();
  const signature = headers().get("Stripe-Signature") ?? "";

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (error) {
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Unknown error",
      },
      {
        status: 400,
      }
    );
  }
// Handle the event
try {
  switch (event.type) {
    case "checkout.session.completed":
      const completedEvent = event.data.object as Stripe.Checkout.Session & {
        metadata: {
          userId: string;
          credits: string;
        };
      };

      const userId = completedEvent.metadata.userId;
      const credits = parseInt(completedEvent.metadata.credits);

      //console.log(completedEvent.metadata);

      // We can update the credits now for the user
        const getAmount =  await prismadb.billings.findUnique({
            where: {
              userId: userId,
            },
            select: {amount: true, id: true }
            }
          );

          if (!getAmount){
            return NextResponse.json(
                {
                  error: "Could not find credits for the user",
                },
                {
                  status: 400,
                }
              );
          }

          await prismadb.billings.update({
            where: {
              userId: userId,
            },
            data: {amount: getAmount.amount + credits}
          });
        

          //Get Line Items
          const session = await stripe.checkout.sessions.retrieve(
            (event.data.object as Stripe.Checkout.Session).id,
            {
              expand: ["line_items"],
            }
          );
          const customerId = session.customer as string;
          const customerDetails = session.customer_details;
  
          if (customerDetails?.email) {
            const user = await prismadb.owner.findUnique({ where: { email: customerDetails.email } });
            if (!user) throw new Error("User not found");
  
            if (!user.customerId) {
              await prismadb.owner.update({
                where: { id: user.id },
                data: { customerId },
              });
            }
  
            const lineItems = session.line_items?.data || [];

					for (const item of lineItems) {
						const priceId = item.price?.id;
						const isSubscription = item.price?.type === "recurring";

						if (isSubscription) {
							let endDate = new Date();
              //Subscription only monthly
              endDate.setMonth(endDate.getMonth() + 1); // 1 month from now

              //If I need to add yearly
							/* if (priceId === process.env.STRIPE_YEARLY_PRICE_ID!) {
								endDate.setFullYear(endDate.getFullYear() + 1); // 1 year from now
							} else if (priceId === process.env.STRIPE_MONTHLY_PRICE_ID!) {
								endDate.setMonth(endDate.getMonth() + 1); // 1 month from now
							} else {
								throw new Error("Invalid priceId");
							} */


							// Create the subscription if it does not exist already, but if it exists it will update it.
							await prismadb.billings.upsert({
								where: { userId: user.id! },
								create: {
									userId: user.id,
									startDate: new Date(),
									endDate: endDate,
                  subscribed: true,
									period: priceId === process.env.STRIPE_YEARLY_PRICE_ID! ? "yearly" : "monthly",
								},
								update: {
									period: priceId === process.env.STRIPE_YEARLY_PRICE_ID! ? "yearly" : "monthly",
									startDate: new Date(),
									endDate: endDate,
                  subscribed: true
								},
							});
						} else {
							// one_time_purchase
						}
          }
				}
        break;
        case "customer.subscription.deleted": {
          const subscription = await stripe.subscriptions.retrieve((event.data.object as Stripe.Subscription).id);
          const user = await prismadb.owner.findUnique({
            where: { customerId: subscription.customer as string },
          });
          if (user) {
            await prismadb.billings.update({
              where: { userId: user.id },
              data: {
                plan: "STANDARD",
                subscribed: false
               },
            });
          } else {
            console.error("User not found for the subscription deleted event.");
            throw new Error("User not found for the subscription deleted event.");
          }
  
          break;
        }
        default:
          console.log(`Unhandled event type ${event.type}`);
  }
} catch (error) {
  console.error("Error handling event", error);
  return new Response("Webhook Error", { status: 400 });
}
  console.log("Checkout has been trigered");

  return NextResponse.json(null, { status: 200 });
}
