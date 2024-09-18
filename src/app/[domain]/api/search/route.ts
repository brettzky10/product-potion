import { NextResponse } from 'next/server';
import OpenAI from 'openai';
import { supabaseClient } from '@/lib/supabase/client';

// Initialize the OpenAI client with your API key
const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
});

export async function POST(request: Request) {
  const body = await request.json();

  const query = body.searchTerm;
  const storeId = body.storeId;

  if (!query) {
    return NextResponse.json({ error: 'Empty query' });
  }

  // Create Embedding
  const openAiEmbeddings = await openai.embeddings.create({
    model: 'text-embedding-ada-002',
    input: query,
  });

  const [{ embedding }] = openAiEmbeddings.data;

  // Search Supabase
  const { data, error: searchError } = await supabaseClient.rpc('product_search', {
    query_embedding: embedding,
    similarity_threshold: 0.8,
    match_count: 2,
    store_id: storeId
  });

  // query ChatGPT via Langchain, pass the query and database results as context

  if (data) {
    console.log(data);
    return NextResponse.json({ data });
  }
  console.log("Search Error:", searchError);

  return NextResponse.json({ searchError });
}