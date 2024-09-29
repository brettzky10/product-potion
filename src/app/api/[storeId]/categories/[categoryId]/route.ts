import prismadb from "@/lib/db/prismadb";
import { createClient } from "@/lib/supabase/supabase-server";
//import { auth } from "@clerk/nextjs/server";
//import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function GET (
    req: Request, //Even though req is not used it is needed
    { params }: { params: { categoryId: string }}
): Promise<any> {
    try {
        if (!params.categoryId){
            return new NextResponse("Category id is required", {status: 400});
        };

        const category = await prismadb.category.findUnique({
            where: {
                id: params.categoryId,
            },
            include: {
                //billboard: true,
                
            }
        });

        return NextResponse.json(category);

    } catch (error){
        console.log('[CATEGORY_GET]', error);
        return new NextResponse("Internal error", {status: 500});
    }
};

export async function PATCH (
    req: Request,
    { params }: { params: { storeId: string, categoryId: string }}
): Promise<any> {
    try {
        //const { userId } = auth();

        const supabase = createClient();

      const {
          data: { user },
      } = await supabase.auth.getUser();

        const body = await req.json();

        const { name } = body;

        if (!user?.id) {
            return new NextResponse("Unauthenticated", {status: 401});
        };

        if(!name){
            return new NextResponse("Name is required", {status: 400});
        };

       /*  if(!billboardId){
            return new NextResponse("A billboard is required", {status: 400});
        }; */

        if (!params.categoryId){
            return new NextResponse("Category Id is required", {status: 400});
        };

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

        const category = await prismadb.category.updateMany({
            where: {
                id: params.categoryId,
            },
            data: {
                name,
                //billboardId
            }
        });

        return NextResponse.json(category);

    } catch (error){
        console.log('[CATEGORY_PATCH]', error);
        return new NextResponse("Internal error", {status: 500});
    }
};

export async function DELETE (
    req: Request, //Even though req is not used it is needed
    { params }: { params: { storeId: string, categoryId: string }}
): Promise<any> {
    try {
        const supabase = createClient();

      const {
          data: { user },
      } = await supabase.auth.getUser();
        

        if (!user?.id) {
            return new NextResponse("Unauthenticated", {status: 401});
        };

        if (!params.categoryId){
            return new NextResponse("Category id is required", {status: 400});
        };

        const storeByUserId = await prismadb.store.findFirst({
            where: {
                id: params.storeId,
                userId: user.id
            }
        });
        //Make sure the user that owns the store is the one changing the Category
        if (!storeByUserId){
            return new NextResponse("Unauthorized"), {status: 403};
        };

        const category = await prismadb.category.deleteMany({
            where: {
                id: params.categoryId,
            }
        });

        return NextResponse.json(category);

    } catch (error){
        console.log('[CATEGORY_DELETE]', error);
        return new NextResponse("Internal error", {status: 500});
    }
};