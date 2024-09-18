

import prismadb from "@/lib/db/prismadb";
import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/supabase-server";
import { supabaseClient } from "@/lib/supabase/client";

import { OpenAI } from "openai"

const openAi = new OpenAI({apiKey: process.env.OPENAI_API_KEY})



export async function GET (
    req: Request, //Even though req is not used it is needed
    { params }: { params: { productId: string }}
): Promise<any> {
    try {
        if (!params.productId){
            return new NextResponse("Product id is required", {status: 400});
        };

        const product = await prismadb.product.findUnique({
            where: {
                id: params.productId,
            },
        });
        

        return NextResponse.json(product);

    } catch (error){
        console.log('[PRODUCT_GET]', error);
        return new NextResponse("Internal error", {status: 500});
    }
};

export async function PATCH (
    req: Request,
    { params }: { params: { storeId: string, productId: string }}
): Promise<any> {
    try {
        const supabase = createClient();

        const {
          data: { user },
        } = await supabase.auth.getUser();
        const body = await req.json();

        const { 
            name,
            priceInCents,
            description,
            imagePath,
            category,
            quantity,
            isAvailableForPurchase,
         } = body;

        if (!user) {
            return new NextResponse("Unauthenticated", {status: 401});
        };

        if (!name){
            return new NextResponse("Name is required"), {status: 400};
        }

        if (!description){
            return new NextResponse("Description is required"), {status: 400};
        }

        if (!imagePath){
            return new NextResponse("Images are required"), {status: 400};
        }

        if (!priceInCents){
            return new NextResponse("Price is required"), {status: 400};
        }

        /* if (!categoryId){
            return new NextResponse("Category Id is required"), {status: 400};
        } */

        if (!params.productId){
            return new NextResponse("Product id is required", {status: 400});
        };

        const storeByUserId = await prismadb.store.findFirst({
            where: {
                id: params.storeId,
                userId: user.id
            }
        });
        //Make sure the user that owns the store is the one changing the product
        if (!storeByUserId){
            return new NextResponse("Unauthorized"), {status: 403};
        }

        const product = await prismadb.product.update({
            where: {
                id: params.productId,
            },
            data: {
                name,
                priceInCents,
                description,
                quantity,
                category,
                imagePath,
                isAvailableForPurchase,
            }
        });


        //console.log("ID: ", product.id)

        const embeddingResponse = await generateOpenAIEmbeddings(product);

        const embeddings = embeddingResponse.data[0].embedding
        const tokens = embeddingResponse.usage.total_tokens

        //Embeddings:
        const { data, error: errorWithEmbeddingsInsert } = await supabaseClient
        .from('product')
        .update({
          embedding: embeddings
        })
        .eq('id', params.productId)

      // Check for errors
      if (errorWithEmbeddingsInsert) {
        console.error('Error inserting data into Supabase:', errorWithEmbeddingsInsert.message);
        return NextResponse.json({
          success: false,
          status: 500,
          result: errorWithEmbeddingsInsert,
        });
      }

      //Tokens from Embedding
      const { data: tokenData, error: errorWithTokensInsert } = await supabaseClient
      .from('product')
      .update({
        tokens: tokens
      })
      .eq('id', product.id)

      // Check for errors
      if (errorWithTokensInsert) {
          console.error('Error inserting tokens into Supabase:', errorWithTokensInsert.message);
          return NextResponse.json({
          success: false,
          status: 500,
          result: errorWithTokensInsert,
          });
      }


        return NextResponse.json(product);

    } catch (error){
        console.log('[PRODUCT_PATCH]', error);
        return new NextResponse("Internal error", {status: 500});
    }
};

export async function DELETE (
    req: Request, //Even though req is not used it is needed
    { params }: { params: { storeId: string, productId: string }}
): Promise<any> {
    try {
        const supabase = createClient();

        const {
          data: { user },
        } = await supabase.auth.getUser();
        

        if (!user) {
            return new NextResponse("Unauthenticated", {status: 401});
        };

        if (!params.productId){
            return new NextResponse("Product id is required", {status: 400});
        };

        const storeByUserId = await prismadb.store.findFirst({
            where: {
                id: params.storeId,
                userId: user.id
            }
        });
        //Make sure the user that owns the store is the one changing the product
        if (!storeByUserId){
            return new NextResponse("Unauthorized"), {status: 403};
        };

        const product = await prismadb.product.deleteMany({
            where: {
                id: params.productId,
            }
        });

        //TODO: Delete Supabase Photos

        return NextResponse.json(product);

    } catch (error){
        console.log('[PRODUCT_DELETE]', error);
        return new NextResponse("Internal error", {status: 500});
    }
};


//Embeddings:
// Function to generate OpenAI embeddings for a given text
async function generateOpenAIEmbeddings(product: any) {
    const response = await openAi.embeddings.create({
      model: 'text-embedding-ada-002',
      input: `${product.name} - ${product.description}`,
    });
    return response;
  }