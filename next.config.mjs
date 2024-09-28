import './src/lib/env/env.mjs';

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['localhost', 'plus.unsplash.com']
  }
};

export default nextConfig;
