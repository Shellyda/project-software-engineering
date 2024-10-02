import './src/lib/env/env.mjs';

/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      'localhost',
      'plus.unsplash.com',
      'images.unsplash.com',
      'gtnomugolggycmbfxvql.supabase.co',
      'icons.veryicon.com'
    ]
  }
};

export default nextConfig;
