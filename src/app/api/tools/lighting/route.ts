
import prismadb from '@/lib/db/prismadb';
import { createClient } from '@/lib/supabase/supabase-server';
import { NextResponse } from 'next/server';
import Replicate from 'replicate';

export async function POST(request: Request) {
  
  //Prisma Update Credits
  const supabase = createClient();

      const {
          data: { user },
      } = await supabase.auth.getUser();

      if (!user) return new NextResponse('User  not authenticated')
      const userId = user.id

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
  const model = "zsxkib/ic-light:d41bcb10d8c159868f4cfbd7c6a2ca01484f7d39e4613419d5952c61562f1ba7"
 

  // 4. Set the image which is the image we uploaded from the client
  const input = {
    cfg: 2,
    steps: 25,
    width: 512,
    height: 640,
    prompt: req.prompt || "A cozy room with large wooden beams, lots of glass creating an elegant and sophisticated atmosphere, 4k photo, highly detailed",
    light_source: "Left Light",
    highres_scale: 1.5,
    output_format: "png",
    subject_image: req.image,
    lowres_denoise: 0.9,
    output_quality: 80,
    appended_prompt: "best quality, keep the product in the photo unchanged, no new colors.",
    highres_denoise: 0.5,
    negative_prompt: "lowres, bad anatomy, bad hands, cropped, worst quality",
    number_of_images: 1
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