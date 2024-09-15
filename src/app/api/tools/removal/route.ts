import { NextResponse } from 'next/server';
import Replicate from 'replicate';
import { createClient } from '@/lib/supabase/supabase-server';
import prismadb from '@/lib/db/prismadb';


export async function POST(request: Request) {


  

  // Initialize a Supabase client using server-side cookies
    // const supabase = createSupabaseReqRes()
    // //const supabase = createSupabaseServerSide()
  
    // // Fetch user data to determine if the user is authenticated
    const supabase = createClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();
      if (!user) return new NextResponse('User  not authenticated')
      const userId = user.id

    // //console.log(session?.user.id)
    // const { data: userCredits } = await supabase
    //   .from("billings")
    //   .select()
    //   .eq("userId", userId)
    //   .single();

    // if (userCredits?.amount === 0) { // (!userCredits || )
    //   return NextResponse.json(
    //     { error: "Insufficient credits" },
    //     { status: 402 }
    //   );
    // }

    // // Remove one credit from the user
    // const { error: updateCreditsError } = await supabase
    //   .from("billings")
    //   .update({ amount: userCredits.amount! - 1 })
    //   .eq("userId", userId);

    // if (updateCreditsError) {
    //   return NextResponse.json(
    //     { error: updateCreditsError.message },
    //     { status: 500 }
    //   );
    // }

    //Prisma Update Credits

    const getAmount =  await prismadb.billings.findUnique({
      where: {
        userId: userId,
      },
      select: {amount: true, id: true }
      }
    );

    if (!getAmount || getAmount?.amount === 0) {
      return NextResponse.json(
        { error: "Insufficient credits" },
        { status: 402 }
      );
    } else {
      const updateCredits = await prismadb.billings.update({
        where: {
          userId: userId,
        },
        data: { amount: { decrement: 1 }
  
        }
  
      });
    }



  // 1. Get request data (in JSON format) from the client
  const req = await request.json();

  // 2. Initialize the replicate object with our Replicate API token
  const replicate = new Replicate({
    auth: process.env.REPLICATE_API_KEY as string,
  });

  // 3. Set the model that we're about to run
  const model = "lucataco/remove-bg:95fcc2a26d3899cd6c2691c900465aaeff466285a65c14638cc5f36f34befaf1"
  //'cjwbw/rembg:fb8af171cfa1616ddcf1242c093f9c46bcada5ad4cf6f2fbe8b81b330ec5c003';

  // 4. Set the image which is the image we uploaded from the client
  const input = {
    image: req.image,
  };

  // 5. Run the Replicate's model (to remove background) and get the output image
  const output = await replicate.run(model, { input });

  // 6. Check if the output is NULL then return error back to the client
  if (!output) {
    console.log('Something went wrong');
    return NextResponse.json(
      { error: 'Something went wrong' },
      { status: 500 }
    );
  }

  // 7. Otherwise, we show output in the console (server-side)
  //  and return the output back to the client
  console.log('Output', output);
  return NextResponse.json({ output }, { status: 201 });
}