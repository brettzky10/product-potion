// import { cookies } from "next/headers";
// import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";

import { stripe } from "@/lib/stripe";
// import { createOrRetrieveCustomer } from "@/lib/supabase-admin";
// import { getURL } from "@/lib/helpers";
// import { Database } from "@/types_db";
import { createClient } from "@/lib/supabase/supabase-server";
import prismadb from "@/lib/db/prismadb";
import { createOrRetrieveCustomer } from "@/lib/actions/stripe";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  if (req.method === "POST") {
    try {
      const supabase = await createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) throw Error("Could not get user");
      const customer = await createOrRetrieveCustomer({
        uuid: user.id || "",
        email: user.email || "",
      });
/* 
      const customer = await prismadb.owner.findUnique({
        where:{
            userId: user.id,
            email: user.email
        },
        select:{
            customerId: true
        }
      })

      if (!customer?.customerId) throw Error("Could not get customer");

      const { url } = await stripe.billingPortal.sessions.create({
        customer: customer.customerId,
        return_url:  `${process.env.NEXT_PUBLIC_SITE_URL}`, //`${getURL()}subscription`,
      }); */

      if (!customer) throw Error("Could not get customer");

      const { url } = await stripe.billingPortal.sessions.create({
        customer: customer,
        return_url:  `${process.env.NEXT_PUBLIC_SITE_URL}`, //`${getURL()}subscription`,
      });

      return new Response(JSON.stringify({ url }), {
        status: 200,
      });
    } catch (err: any) {
      console.log(err);
      return new Response(
        JSON.stringify({ error: { statusCode: 500, message: err.message } }),
        {
          status: 500,
        }
      );
    }
  } else {
    return new Response("Method Not Allowed", {
      headers: { Allow: "POST" },
      status: 405,
    });
  }
}