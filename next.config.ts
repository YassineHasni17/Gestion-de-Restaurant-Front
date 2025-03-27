// import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
  
// };

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000",
  },
  images: {
    domains: ['example.com']
  },  
  typescript: {   
    ignoreBuildErrors: false,
  },
  reactStrictMode: true
};

export default nextConfig;
