"use client";


import { useState } from "react";
import { useStoreModalStore } from "@/lib/hooks/use-store-modal";
import { Modal } from "@/components/ui/modal";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";


export const StoreModal = ()=>{

    const storeModal = useStoreModalStore();

    const [loading, setLoading] = useState(false);
    const [name, setName] = useState('');
    const [subdomain, setSubdomain] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');


    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        setMessage('');
        setError('');

        try{
            setLoading(true);
            const response = await fetch('/api/store', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, subdomain }),
              });
            if (response.ok) {
                const data = await response.json();
                setMessage(`Business created successfully: ${data.name} (${data.subdomain})`);
                setName('');
                setSubdomain('');
                toast.success(`${data.name} created!`);
                //Create new Store:
                // const response = await axios.post('/api/stores', name);
            
                //Use this instead of NextRouter b/c it refreshes db and loads new store
                window.location.assign(`/store/${data.id}/dashboard`);
              } else {
                const errorData = await response.json();
                setError(errorData.error || 'Failed to create tenant');
              }
            

        } catch (error){
            toast.error("Something went wrong.");
            setError('An error occurred while creating the tenant');
        } finally {
            setLoading(false);
        }
    }

    return(
    <Modal
        title='Create Business'
        description="Add businesses"
        isOpen={storeModal.isOpen}
        onClose={storeModal.onClose}
    >
        <div className="">
            <div className="space-y-4 py-2 pb-4">
            <form onSubmit={handleSubmit} className="w-full max-w-md">
                <div className="mb-4">
                <Input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Store Name"
                    required
                    maxLength={32}
                    autoFocus
                />
                </div>
                <div className="mb-4">
                <Input
                    type="text"
                    value={subdomain}
                    onChange={(e) => setSubdomain(e.target.value)}
                    placeholder="Subdomain"
                    required
                    pattern="[a-zA-Z0-9\-]+" // only allow lowercase letters, numbers, and dashes
                    maxLength={32}
                    autoCapitalize="off"
                />
                </div>
                <Button type="submit" className="w-full">Create Business</Button>
            </form>
            </div>
        </div>

    </Modal>
    )
}