import { useQuery } from "@tanstack/react-query";
import { createClient } from "../supabase/supabase-client";

export function useUser() {
	const supabase = createClient();
	return useQuery({
		queryKey: ["user"],
		queryFn: async () => {
			const { data } = await supabase.auth.getSession();
			return { user: data.session?.user };
		},
		staleTime: Infinity,
	});
}
