import { NextResponse } from 'next/server';
import { type NextRequest } from "next/server";
import { updateSession } from "@/lib/supabase/middleware";

export async function middleware(req: NextRequest) {

  const url = req.nextUrl;
  let hostname = req.headers.get("host") || '';

  // Remove port if it exists
  hostname = hostname.split(':')[0];

  // Define allowed domains (including main domain and localhost)
  const allowedDomains = ["productpotion.com", "www.productpotion.com", "localhost:3000"];

  // Check if the current hostname is in the list of allowed domains
  const isMainDomain = allowedDomains.includes(hostname);

  // Extract subdomain if not a main domain
  const subdomain = isMainDomain ? null : hostname.split('.')[0];

  console.log('Middleware: Hostname:', hostname);
  console.log('Middleware: Subdomain:', subdomain);

  // If it's a main domain, allow the request to proceed
  if (isMainDomain) {
    console.log('Middleware: Main domain detected, passing through');
    return NextResponse.next();
  }

  // Handle subdomain logic
  if (subdomain) {
    try {
      // Use fetch to verify if the subdomain exists
      const response = await fetch(`${url.origin}/api/tenant?subdomain=${subdomain}`);

      if (response.ok) {
        console.log('Middleware: Valid subdomain detected, rewriting URL');
        // Rewrite the URL to a dynamic route based on the subdomain
        return NextResponse.rewrite(new URL(`/${subdomain}${url.pathname}`, req.url));
        
      }
    } catch (error) {
      console.error('Middleware: Error fetching tenant:', error);
    }
  }

  console.log('Middleware: Invalid subdomain or domain, returning 404');
  // If none of the above conditions are met, return a 404 response (This is preventing cron job:)
  //return new NextResponse(null, { status: 404 });


  return await updateSession(req);
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - images - .svg, .png, .jpg, .jpeg, .gif, .webp
     * Feel free to modify this pattern to include more paths.
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};