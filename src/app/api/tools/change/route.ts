/* import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  imageURL: string;
};

type Error = {
  error: string;
};

const sleep = (ms: number) => {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, ms);
  });
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data | Error>
) {
  // upload image and get pooling request URL
  const file = req.body.file;
  const prompt = req.body.prompt;

  const replicateUploadResponse = await fetch(
    "https://api.replicate.com/v1/predictions",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Token " + process.env.REPLICATE_API_KEY,
      },
      body: JSON.stringify({
        version:
          "30c1d0b916a6f8efce20493f5d61ee27491ab2a60437c13c588468b9810ec23f",
        input: { image: file, prompt: prompt },
      }),
    }
  );

  const JsonReplicateUploadResponse = await replicateUploadResponse.json();
  if (
    JsonReplicateUploadResponse.error ||
    JsonReplicateUploadResponse.status === "failed"
  )
    return res.status(400).send({ error: "Error while uploading image" });

  // pool request URl
  const statusPoolURL = JsonReplicateUploadResponse.urls.get;
  let digestedImageURL: string | null = null;
  while (!digestedImageURL) {
    const replicateStatusResponse = await fetch(statusPoolURL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Token " + process.env.REPLICATE_API_TOKEN,
      },
    });

    const jsonReplicateStatusResponse = await replicateStatusResponse.json();

    if (jsonReplicateStatusResponse.status === "failed") {
      console.log(jsonReplicateStatusResponse);
      return res.status(400).json({ error: "Error while fetching status" });
    } else if (jsonReplicateStatusResponse.status === "succeeded") {
      digestedImageURL = jsonReplicateStatusResponse.output;
    } else {
      await sleep(1000);
    }
  }

  res.status(200).json({ imageURL: digestedImageURL });
} */

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

  const file = req.file;
  const prompt = req.prompt;

  // 2. Initialize the replicate object with our Replicate API token
  const replicate = new Replicate({
    auth: process.env.REPLICATE_API_KEY as string,
  });

  // 3. Set the model that we're about to run
  /* const model = "danielguedesb/pix2pix:4bff1aa0065ded886ff4c853e97df9755e70c0589ef8638ff6717044fc70c22a" */
  const model = "black-forest-labs/flux-dev"
 

  // 4. Set the image which is the image we uploaded from the client
  const input = {
    //cfg: 2,
    //steps: 25,
    //width: 512,
    //height: 640,
    prompt: prompt, /* || "A cozy room with large wooden beams, lots of glass creating an elegant and sophisticated atmosphere, 4k photo, highly detailed", */
    //light_source: "Left Light",
    //highres_scale: 1.5,
    //output_format: "png",
    image: file,
    //lowres_denoise: 0.9,
    //output_quality: 80,
    //appended_prompt: "best quality, keep the product in the photo unchanged, no new colors.",
    //highres_denoise: 0.5,
    //negative_prompt: "lowres, bad anatomy, bad hands, cropped, worst quality",
    //number_of_images: 1
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
  return NextResponse.json({ imageURL: output }, { status: 201 });
}