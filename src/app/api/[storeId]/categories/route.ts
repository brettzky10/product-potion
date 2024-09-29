import { NextResponse } from "next/server";
//import { auth } from "@clerk/nextjs/server";

import prismadb from "@/lib/db/prismadb";
import { createClient } from "@/lib/supabase/supabase-server";

export async function POST(
    req: Request,
    { params }: { params: {storeId: string}}
): Promise<any>  {
    try{
        const supabase = createClient();

      const {
          data: { user },
      } = await supabase.auth.getUser();

        const body = await req.json();

        const { name } = body;


        if (!user?.id) {
            return new NextResponse("Unauthenticated"), { status: 401};
        }

        if (!name){
            return new NextResponse("Name is required"), {status: 400};
        }

        /* if (!billboardId){
            return new NextResponse("A billboard is required"), {status: 400};
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

        const category = await prismadb.category.create({
            data: {
                name,
                //billboardId,
                storeId: params.storeId
            }
        });

        return NextResponse.json(category);

    } catch (error){
        console.log('[CATEGORIES_POST]', error);
        return new NextResponse("Internal error", {status: 500});
    }
}


export async function GET(
    req: Request,
    { params }: { params: {storeId: string}}
): Promise<any>  {
    try{

        if (!params.storeId){
            return new NextResponse("Store id is required"), {status: 400};
        }
        //Get all Categories
        const categories = await prismadb.category.findMany({
            where: {
                storeId: params.storeId,
            },
        });

        return NextResponse.json(categories);

    } catch (error){
        console.log('[CATEGORIES_POST]', error);
        return new NextResponse("Internal error", {status: 500});
    }
}