'use client';
import Image from 'next/image';
import React, { useState, useEffect } from 'react';
//import { createClient } from '@supabase/supabase-js';
import { supabaseClient } from '@/lib/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import { Card } from '@/components/ui/card';
import { formatCurrency, truncateString } from '@/lib/utils';
import { Submitbutton } from '@/components/ui/submit-buttons';
import { Loader2 } from 'lucide-react';

export default function ProductSearchSection({storeId}:{storeId: string}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false)
  const [searchResults, setSearchResults] = useState([{
    id: '',
    imagePath: '',
    name: "",
    isAvailableForPurchase: true,
    description: '',
    priceInCents: 0,
    //quantity: 1,
    //category: 'fitness',
    //createdAt: new Date(),
    //updatedAt: new Date(),
    storeId: '',
    //tokens: null
  }]);


  const ProductCard = ({ product }: { product: {id: string, name: string,  description: string, priceInCents: number, imagePath: string} }) => (
    <Link href={`/products/${product.id}`}>
      <Card className="bg-themeBlack border-themeGray rounded-xl overflow-hidden h-full">
        <img
          src={`${product.imagePath}` || '/icons/placeholder.svg' }
          alt="thumbnail"
          className="opacity-70 w-full aspect-video"
        />
        <div className="p-6">
          <h3 className="text-lg text-themeTextGray font-bold">{product.name}</h3>
          <p className='text-themeTextWhite'>{formatCurrency(product.priceInCents / 100)}</p>
          <p className="text-base text-themeTextGray">
            {product.description && truncateString(product.description)}
          </p>
        </div>
      </Card>
    </Link>
  );

  useEffect(() => {
    fetchProducts();
  }, []);



  // fetch products from supabase
  const fetchProducts = async () => {
    
    const { data, error } = await supabaseClient
      .from('product')
      .select('*')
      .match({ storeId: `${storeId}` })
      .order('name', { ascending: true })
      .limit(6);

    if (error) {
      console.log(error);
    } else {
      //console.log(data);
      setSearchResults(data as never[]);
    }
  };

  const handleChange = (event: any) => {
    setSearchTerm(event.target.value);
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    setLoading(true)
    // REGULAR SERACH
    // search the products array for the search term
    // const searchResults = products.filter((product) => {
    //   const name = `${product.name}`;
    //   return name.toLowerCase().includes(searchTerm.toLowerCase());
    // });
    // setSearchResults(searchResults);
    // console.log(searchResults);

    // VECTOR SEARCH
    if (searchTerm.trim() === '') {
      // If the search term is empty, fetch the original list from Supabase
      await fetchProducts();
    } else {
      const semanticSearch = await fetch('/api/search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          searchTerm: searchTerm,
          storeId: storeId
        }),
      });

      const semanticSearchResponse = await semanticSearch.json();
      console.log("semantic response", semanticSearchResponse.data);
      setSearchResults(semanticSearchResponse.data as never[]);
      //console.log("Data:", searchResults)
      setLoading(false)
    }
  };

  return (
    <div className="py-8 w-full flex justify-center items-center flex-col overflow-auto">
      <form
        onSubmit={handleSubmit}
        className="rounded-lg shadow-md flex w-full md:w-1/2 p-4"
      >
        <Input
          type="text"
          placeholder="Search..."
          className="flex-grow text-lg font-light focus:outline-none rounded-r-none"
          value={searchTerm}
          onChange={handleChange}
        />
        {/* <Button
          type="submit"
          variant={"secondary"}
          className="mx-1 rounded-l-none"
          disabled
        >
          Search
        </Button> */}
        {loading ? (
        <Button disabled >
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Please Wait
        </Button>
      ) : (
        <Button type="submit" className={`${"bg-primary"}`}>Search</Button>
      )}

        
      </form>
      <div className="justify-center overflow-y-auto grid grid-cols-1 md:grid-cols-3 gap-4">
        {searchResults.map((product, index) => (
          <ProductCard key={index} product={product} />
        ))}
      </div>
    </div>
  );
}