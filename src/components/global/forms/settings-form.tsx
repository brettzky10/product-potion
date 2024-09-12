"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { store } from "@prisma/client";
import { Trash } from "lucide-react";
import { useForm } from "react-hook-form";
import { useState } from "react";
//import { toast } from "react-hot-toast";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";

import { Heading } from "@/components/ui/heading";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { AlertModal } from "@/components/global/modals/alert-modal";
import { ApiAlert } from "@/components/ui/api-alert";
import { useOrigin } from "@/lib/hooks/use-origin";
import { toast } from "sonner";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader } from "@/components/ui/dialog";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";


interface SettingsFormProps {
    initialData: store;
}

const formSchema = z.object({
    name: z.string().min(1),
});

type SettingsFormValues = z.infer<typeof formSchema>;

export const SettingsForm: React.FC<SettingsFormProps> = ({
    initialData
})=> {
    const params = useParams();
    const router = useRouter();
    const origin = useOrigin();

    const [open, setOpen] = useState(false); //For alert Modal
    const [loading, setLoading] = useState(false);

    const form = useForm<SettingsFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: initialData,
    });

    const onSubmit = async (data: SettingsFormValues) => {
        try{
            setLoading(true);
            await axios.patch(`/api/stores/${params.storeId}`, data);
            router.refresh();
            toast.success("Store updated.");
        } catch(error){
            toast.error("Something went wrong");
        } finally{
            setLoading(false);
        }
    };

    const onDelete = async ()=> {
        try{
            setLoading(true);
            await axios.delete(`/api/stores/${params.storeId}`);
            router.refresh();
            router.push("/");
            toast.success("Store deleted.");
        } catch(error){
            toast.error("Make sure you remove all products and categories first.");
        } finally{
            setLoading(false);
            setOpen(false);
        }
    }

    return (
        <> <div className="space-y-5">
            <AlertModal isOpen={open} onClose={()=> setOpen(false)} onConfirm={onDelete} loading={loading}/>
            <div className="flex items-center justify-between">
                <Heading title="Settings" description="Manage store preferences"/>
                <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger>
                        <Button disabled={loading} variant="destructive" size="icon" onClick={()=> setOpen(true)}>
                            <Trash className="h-4 w-4"/>
                    </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                        Delete Account
                    </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
               
                
            </div>
            <Separator/>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full">
                    <div className="grid grid-cols-3 gap-8">
                        <FormField control={form.control} name="name" render={({field})=> (
                            <FormItem>
                                <FormLabel>Name</FormLabel>
                                <FormControl>
                                    <Input disabled={loading} placeholder="Store name" {...field} className="bg-white"/>
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}/>
                    </div>
                    <Button disabled={loading} className="ml-auto" type="submit">
                        Save Changes
                    </Button>
                </form>
            </Form>
            <Separator className="my-5"/>
            <ApiAlert title="NEXT_PUBLIC_API_URL" description={`${origin}/api/${params.storeId}`} variant="public"/>
            </div>
            <Separator className="my-5"/>
            {/* <Card className="w-full">
                <CardHeader className="text-xl font-bold">
                    Delete Account
                </CardHeader>
                <CardContent>
                    <Dialog>
                        <DialogTrigger>
                            <Button variant={"destructive"}>
                                Delete Account
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="bg-white">
                            <DialogHeader>
                                Delete your Account?
                            </DialogHeader>
                            <DialogDescription>
                                You data will be permanently deleted
                            </DialogDescription>
                            <Button variant={"destructive"}>
                                Delete
                            </Button>
                        </DialogContent>
                    </Dialog>
                </CardContent>
            </Card> */}
        </>
    );
};