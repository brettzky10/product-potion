import { NextResponse } from "next/server";
//import { auth } from "@clerk/nextjs/server";
import prismadb from "@/lib/db/prismadb";

import { OpenAI } from "openai"
import { createClient } from '@/lib/supabase/supabase-server';
import { supabaseClient } from "@/lib/supabase/client";

const openAi = new OpenAI({apiKey: process.env.OPENAI_API_KEY})

export async function POST(
    req: Request,
    { params }: { params: {storeId: string}}
): Promise<any>  {

    //Create Product
    try{
        const supabase = createClient();

        const {
          data: { user },
        } = await supabase.auth.getUser();
        const body = await req.json();

        const { 
            name,
            priceInCents,
            description,
            quantity,
            //category,
            isAvailableForPurchase,
            imagePath
         } = body;


        /* const embedding = await generateOpenAiEmbeddings(description)
        await supabase
        .from('product')
        .upsert([{embedding}]) */


        if (!user) {
            return new NextResponse("Unauthenticated"), { status: 401};
        }

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

       /*  if (!category){
            return new NextResponse("Category is required"), {status: 400};
        } */

        if (!params.storeId){
            return new NextResponse("Store id is required"), {status: 400};
        }

        const storeByUserId = await prismadb.store.findFirst({
            where: {
                id: params.storeId,
                userId: user.id
            }
        });
        //Make sure the user that owns the store is the one changing the billboard
        if (!storeByUserId){
            return new NextResponse("Unauthorized"), {status: 403};
        }

        const product = await prismadb.product.create({
            data: {
                name,
                priceInCents,
                //category,
                quantity,
                description,
                isAvailableForPurchase,
                storeId: params.storeId,
                imagePath
            }
        });
        console.log("ID: ",product.id)

        const embeddingResponse = await generateOpenAIEmbeddings(product);

        const embeddings = embeddingResponse.data[0].embedding
        const tokens = embeddingResponse.usage.total_tokens


        
        //Embeddings:
        const { data, error: errorWithEmbeddingsInsert } = await supabaseClient
        .from('product')
        .update({
          embedding: embeddings
        })
        .eq('id', product.id)

        // Check for errors
        if (errorWithEmbeddingsInsert) {
            console.error('Error inserting embeddings into Supabase:', errorWithEmbeddingsInsert.message);
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
        console.log('[PRODUCTS_POST]', error);
        return new NextResponse("Internal error", {status: 500});
    }
}


export async function GET(
    req: Request,
    { params }: { params: {storeId: string}}
): Promise<any>  {
    try{

        const { searchParams } = new URL(req.url);
        //const categoryId = searchParams.get("categoryId") || undefined;
        const isAvailableForPurchase = searchParams.get("isAvailableForPurchase");


        if (!params.storeId){
            return new NextResponse("Store id is required"), {status: 400};
        }
        //Get all Products
        const products = await prismadb.product.findMany({
            where: {
                storeId: params.storeId,
                //categoryId,
                isAvailableForPurchase: isAvailableForPurchase ? true : undefined,
            },
            orderBy: {
                createdAt: 'desc',
            }
        });

        return NextResponse.json(products);

    } catch (error){
        console.log('[PRODUCTS_POST]', error);
        return new NextResponse("Internal error", {status: 500});
    }
}



//Embeddings:
// Function to generate OpenAI embeddings for a given text
async function generateOpenAIEmbeddings(product: any) {
    const response = await openAi.embeddings.create({
      model: 'text-embedding-ada-002',
      input: `${product.name} - ${product.description}`,
    });
    return response;
  }