"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { product, } from "@prisma/client";
import { ArrowBigLeft, PlusCircleIcon, Trash, Wand2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { useState } from "react";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";

import { Heading } from "@/components/ui/heading";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { AlertModal } from "@/components/global/modals/alert-modal";
import { useOrigin } from "@/lib/hooks/use-origin";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import { productSchema } from "@/lib/schemas/product.schema";
import Link from "next/link";
import { Textarea } from "@/components/ui/textarea";
import { createClient } from "@/lib/supabase/supabase-client";
import { Product } from "@/lib/types";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
  } from "@/components/ui/breadcrumb";

  


type ProductFormValues = z.infer<typeof productSchema>;

interface ProductFormProps {
    initialData: product | null
}

export const ProductForm: React.FC<ProductFormProps> = ({
    initialData,
})=> {
    const params = useParams();
    const router = useRouter();

    const [open, setOpen] = useState(false); //For alert Modal
    const [loading, setLoading] = useState(false);

    const title = initialData ? "Edit product" : "Create product";
    const headingDescription = initialData ? "Edit a product" : "Add a new product";
    const toastMessage = initialData ? "Product updated." : "Product created.";
    const action = initialData ? "Save Changes" : "Create";

    const defaultValues = initialData ? {
        ...initialData,
        description: initialData?.description,
        priceInCents: initialData?.priceInCents,
      } : {
        name: '',
        imagePath: '',
        description: '',
        priceInCents: 0,
        category: 'fitness',
        isAvailableForPurchase: true,
        quantity: 1,
        createdAt: new Date(),
      }

    const form = useForm<ProductFormValues>({
        resolver: zodResolver(productSchema),
        defaultValues
      });

    const onSubmit = async (data: ProductFormValues) => {
        try{
            setLoading(true);
            setProductInfo({
                id: '',
                imagePath: '',
                name: "",
                description: '',
                isAvailableForPurchase: true,
                priceInCents: 0,
                quantity: 1,
                createdAt: new Date(),
                category: 'fitness',
                updatedAt: new Date(),
                storeId: '',
                tokens: null
              });
            if (initialData){
                await axios.patch(`/api/${params.storeId}/products/${params.productId}`, data);
            } else{
                await axios.post(`/api/${params.storeId}/products`, data);
              }
            router.refresh();
            router.push(`/store/${params.storeId}/products`);
            toast.success(toastMessage);
        } catch(error){
            toast.error("Something went wrong");
        } finally{
            setLoading(false);
        }
    };

    const onDelete = async ()=> {
        try{
            setLoading(true);
            await axios.delete(`/api/${params.storeId}/products/${params.productId}`);
            router.refresh();
            router.push(`/store/${params.storeId}/products`);
            toast.success("Product deleted.");
        } catch(error){
            toast.error("Something went wrong");
        } finally{
            setLoading(false);
            setOpen(false);
        }
    }

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabase = createClient();

    const randomNameId = `name-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

    const [productInfo, setProductInfo] = useState<product>({
        id: '',
        imagePath: '',
        name: "",
        isAvailableForPurchase: true,
        description: '',
        priceInCents: 0,
        quantity: 1,
        category: 'fitness',
        createdAt: new Date(),
        updatedAt: new Date(),
        storeId: '',
        tokens: null
      });


    const handleFileChange = async (
        event: React.ChangeEvent<HTMLInputElement>
      ) => {
        try {
          const file = event.target.files?.[0];
          if (file) {
            const { data, error } = await supabase.storage
              .from("store-files")
              .upload(`/${randomNameId}`, file, {
                cacheControl: "3600",
                upsert: false,
              });
            if (error) {
              throw error;
            }
            setProductInfo((prev) => ({
              ...prev,
              imagePath: `${supabaseUrl}/storage/v1/object/public/store-files/${data?.path}`,
            }));
          }
        } catch (error) {
          console.error("An error occurred while uploading the file:", error);
        }
      };

    return (
        <>
            <Breadcrumb className="hidden md:flex">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href={`/store/${params.storeId}/dashboard`}>Dashboard</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href={`/store/${params.storeId}/products`}>Products</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Edit</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <Button asChild className="flex md:hidden w-20" size={'sm'}>
            <Link href={`/store/${params.storeId}/products`}>
                <ArrowBigLeft/>
                Back
            </Link>
          </Button>
            <AlertModal isOpen={open} onClose={()=> setOpen(false)} onConfirm={onDelete} loading={loading}/>
            <div className="flex items-center justify-between">
                <Heading title={title} description={headingDescription}/>
                {initialData && (
                    <Button disabled={loading} variant="destructive" size="icon" onClick={()=> setOpen(true)}>
                        <Trash className="h-4 w-4"/>
                    </Button>
                )}
            </div>
            <Separator/>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full justify-between">
                    <FormField control={form.control} name="imagePath" render={({field: { value, onChange, ...fieldProps }})=> (
                                <FormItem>
                                    <FormLabel>Images</FormLabel>
                                    <img
                                        className="rounded-md size-8"
                                        src={productInfo?.imagePath || initialData?.imagePath || "/icons/placeholder.svg"}
                                        alt="Product image"
                                        />
                                    <FormControl>
                                        <Input
                                            id="imagePath"
                                            type="file"
                                            {...fieldProps}
                                            disabled={loading}
                                            onChange={handleFileChange}
                                        />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                        )}/>
                        {/* <Button onClick={()=>router.push(`/edit`)} variant={"gradient"}>
                            <Wand2 className="mr-2 h-4 w-4"/>
                            Edit Images with AI
                        </Button> */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <FormField control={form.control} name="name" render={({field})=> (
                            <FormItem>
                                <FormLabel>Name</FormLabel>
                                <FormControl>
                                    <Input disabled={loading} placeholder="Product name" {...field}/>
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}/>
                        <FormField control={form.control} name="priceInCents" render={({field})=> (
                            <FormItem>
                                <FormLabel>Price</FormLabel>
                                <FormControl>
                                    <Input type="number" disabled={loading} placeholder="9.99" {...field}/>
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}/>
                        
                        <FormField control={form.control} name="isAvailableForPurchase" render={({field})=> (
                            <FormItem className="flex flex-row items-start space-y-0 space-x-3 rounded-md border p-4">
                                <FormControl>
                                    <Checkbox
                                        checked={field.value}
                                        //@ts-ignore
                                        onCheckedChange={field.onChange}/>
                                </FormControl>
                               
                                <div className="space-y-1 leading-none">
                                    <FormLabel>
                                        Available to Purchase
                                    </FormLabel>
                                    <FormDescription>
                                        This product will appear on the homepage
                                    </FormDescription>
                                </div>
                            </FormItem>
                        )}/>
                        {/*  <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select a verified email to display" />
                                    </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                    <SelectItem value="m@example.com">m@example.com</SelectItem>
                                    <SelectItem value="m@google.com">m@google.com</SelectItem>
                                    <SelectItem value="m@support.com">m@support.com</SelectItem>
                                    </SelectContent>
                                </Select> */}
                             <FormField
                            control={form.control}
                            name="category"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel>Category</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select a verified category" />
                                    </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                    <SelectItem value="fitness">Fitness</SelectItem>
                                    <SelectItem value="music">Music</SelectItem>
                                    <SelectItem value="lifestyle">Lifestyle</SelectItem>
                                    </SelectContent>
                                </Select>
                                <FormDescription>
                                    You can manage email addresses in your{" "}
                                    <Link href="/examples/forms">email settings</Link>.
                                </FormDescription>
                                <FormMessage />
                                </FormItem>
                            )}
                            />

                        <FormField control={form.control} name="description" render={({field})=> (
                            <FormItem className="items-start space-y-0 space-x-3 rounded-md border p-4">
                                <div className="space-y-1 leading-none">
                                    <FormLabel>
                                        Description
                                    </FormLabel>
                                    <FormDescription>
                                        A short description about your product
                                    </FormDescription>
                                    <FormControl>
                                        <Textarea
                                        placeholder="Describe your product"
                                        className="resize-none"
                                        {...field}
                                        />
                                    </FormControl>
                                    <FormMessage/>
                                </div>
                            </FormItem>
                        )}/> 
                        
                        
                    </div>
                    <Button disabled={loading} className="ml-auto" type="submit">
                        {action}
                    </Button>
                </form>
            </Form>
        </>
    );
};