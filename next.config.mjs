/** @type {import('next').NextConfig} */


const nextConfig = {
    reactStrictMode: true,
    async rewrites() {
      return [
        {
          source: '/:path*',
          destination: '/:path*',
        },
        {
          source: '/',
          destination: '/api/tenant',
        },
      ]
    },
    images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "replicate.com",
      },
      {
        protocol: "https",
        hostname: "replicate.delivery",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
      {
        protocol: 'https',
        hostname: 'sftqhmhkavkfyaxtoqoe.supabase.co',
      },
    ],
  },
  }
  
  export default nextConfig;
