'use client';
import Image from 'next/image';
import React, { useState, useEffect } from 'react';
//import { createClient } from '@supabase/supabase-js';
import { supabaseClient } from '@/lib/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function ProductSearchSection({storeId}:{storeId: string}) {
  const [searchTerm, setSearchTerm] = useState('');
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


  const ProductCard = ({ product }: { product: {name: string,  description: string, priceInCents: number, imagePath: string} }) => (
    <div className="max-w-sm rounded overflow-hidden shadow-md m-4 h-1/2 w-1/2 bg-primary">
      {/* <img
        src={product.imagePath || '/icons/placeholder.svg'}
        alt={product.name}
        className="w-full h-24 object-cover"
      /> */}
      <div className="px-6 py-4 text-primary-foreground">
        <div className="font-bold text-md mb-2">{`${product.name} - ${product.priceInCents} - ${product.description}`}</div>
      </div>
    </div>
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
      .limit(4);

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
        <Button
          type="submit"
          variant={"secondary"}
          className="mx-1 rounded-l-none"
        >
          Search
        </Button>
      </form>
      <div className="flex flex-wrap justify-center overflow-y-auto">
        {searchResults.map((product, index) => (
          <ProductCard key={index} product={product} />
        ))}
      </div>
    </div>
  );
}