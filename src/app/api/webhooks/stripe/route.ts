import prismadb from "@/lib/db/prismadb";
import {stripe} from "@/lib/stripe";
/* import createSupabaseAdminClient from "@/lib/supabase/admin"; */
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
        
          //toast.success(`${credits} credits added to account`)

      /* if (!creditRow || creditRowError) {
        return NextResponse.json(
          {
            error: "Could not find credits for the user",
          },
          {
            status: 400,
          }
        );
      } */

      /* const { error: updateCreditsError } = await supabase
        .from("credits")
        .update({
          amount: Number(creditRow.amount! + credits),
        })
        .eq("user_id", userId); */

     /*  if (updateCreditsError) {
        console.log(updateCreditsError);
        return NextResponse.json(
          {
            error: "Could not update credits for the user",
          },
          {
            status: 400,
          }
        );
      } */
      break;
    default:
      console.log(`Unhandled event type: ${event.type}`);
  }

  console.log("Checkout has been trigered");

  return NextResponse.json(null, { status: 200 });
}
