import prismadb from "@/lib/db/prismadb";
import { createClient } from "@/lib/supabase/supabase-server";
import { NextResponse } from "next/server";
import type { NextRequest } from 'next/server';
//import { type NextApiRequest, type NextApiResponse } from "next";

/* function addMonth(dateObj: Date, num: number) {
    dateObj.setMonth(dateObj.getMonth() + num);
    const dateString = dateObj?.toISOString()?.split("T")[0];
    if (dateString) {
      return dateString.replace(/-/g, "/");
    }
    return "";
  } */


export async function GET(request: NextRequest) {
     const authHeader = request.headers.get('authorization');
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return new Response('Unauthorized', {
      status: 401,
    });
  }

  const supabase = createClient();

      const {
          data: { user },
      } = await supabase.auth.getUser();
  

      if (!user) {
        return new NextResponse("Unauthorized"), { status: 401};
     }

  try {


    const currentDate = new Date();
    const updateTime = await prismadb.billings.findUnique({
      where:{
        userId: user.id,
      },
      select:{
        endDate: true,
        subscribed: true,
        amount: true
      }
    })

    
    //Add credits
    const getAmount =  await prismadb.billings.findMany({
      where: {
        plan: "PRO",
      },
      select: {amount: true, id: true, startDate: true, endDate: true}
      }
    );

    getAmount.map(async (index)=>{
       //&& index.daysFromPurchase > month
        //Update Pro
        if (index.amount <= 150 && currentDate < index.endDate!){
        const updateProBilling = await prismadb.billings.updateMany({
          where: {
            plan: "PRO",
            
          },
          data: {
            amount: { increment: 2},
          }
        });
        }
        if (index.amount <= 150 && currentDate < index.endDate!){
        //Update Ultimate
        const updateUltimateBilling = await prismadb.billings.updateMany({
          where: {
            plan: "ULTIMATE",
          },
          data: { amount: { increment: 5 }
          }
    
        });
      }
    }
    )

    return NextResponse.json({
      message: "Success",
    });
  }
  catch (error: any) {
    return NextResponse.json({
      message: "Error updating.",
      error: error.message,
    });
  }
}