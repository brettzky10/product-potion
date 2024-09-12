import prismadb from "@/lib/db/prismadb";


export const getCredits = async (userId: string) => {
    try {
      const credits = await prismadb.billings.findFirst({
        where: {
          userId: userId,
        },
        select: {
          amount: true,
        },
      })
  
      if (credits) {
          return credits.amount as number;
      }
    } catch (error) {
      console.log(error)
    }
  }

  export const updateCredits = async (
    userId: string,
    creditRow: number,
    credits: number
  ) => {
    try {

      const creditAdd = await prismadb.billings.update({
        where: {
          id: userId
        },
        data: {
          amount: Number(creditRow! + credits)
        },
      })
  
      if (creditAdd) {
        return { status: 200, message: 'Credit Added' }
      }
    } catch (error) {
      console.log(error)
    }
  }
  
  
    // if (!userId) return null;
    // const supabase = await createSupabaseServerClient();
    
    // const { data } = await supabase
    //   .from("credits")
    //   .select()
    //   .eq("user_id", userId);
  
        // Initialize a Supabase client using server-side cookies
        
  
        // Fetch user data to determine if the user is authenticated
        // const {
        //   data: { session },
        // } = await supabase.auth.getSession();
    
        // /* if (sessionError) {
        //   return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        // } */
        // //console.log(session?.user.id)
        // const { data } = await supabase
        //   .from("credits")
        //   .select()
        //   .eq("user_id", userId)
       
