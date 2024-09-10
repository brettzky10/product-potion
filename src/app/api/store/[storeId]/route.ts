import prismadb from "@/lib/db/prismadb";
//import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { createClient } from '@/lib/supabase/supabase-server';


export async function PATCH (
    req: Request,
    { params }: { params: { storeId: string }}
): Promise<any>{
    try {

        const supabase = createClient();

        const {
          data: { user },
        } = await supabase.auth.getUser();

        //const { userId } = auth();
        const body = await req.json();

        const { name } = body;

        if (!user?.id) {
            return new NextResponse("Unauthenticated", {status: 401});
        };

        if(!name){
            return new NextResponse("Name is required", {status: 400});
        };

        if (!params.storeId){
            return new NextResponse("Store id is required", {status: 400});
        };

        const store = await prismadb.store.updateMany({
            where: {
                id: params.storeId,
                ownerId: user.id
            },
            data: {
                name
            }
        });

        return NextResponse.json(store);

    } catch (error){
        console.log('[STORE_PATCH]', error);
        return new NextResponse("Internal error", {status: 500});
    }
};

export async function DELETE (
    req: Request, //Even though req is not used it is needed
    { params }: { params: { storeId: string }}
): Promise<any>{
    try {
        
        const supabase = createClient();

        const {
          data: { user },
        } = await supabase.auth.getUser();
        

        if (!user?.id) {
            return new NextResponse("Unauthenticated", {status: 401});
        };

        if (!params.storeId){
            return new NextResponse("Store id is required", {status: 400});
        };

        const store = await prismadb.store.deleteMany({
            where: {
                id: params.storeId,
                ownerId: user.id
            }
        });

        return NextResponse.json(store);

    } catch (error){
        console.log('[STORE_DELETE]', error);
        return new NextResponse("Internal error", {status: 500});
    }
};