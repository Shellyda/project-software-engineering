import './src/lib/env/env.mjs';

/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['localhost', 'plus.unsplash.com', 'images.unsplash.com']
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/apresentation',
        permanent: true
      }
    ];
  }
};

export default nextConfig;
