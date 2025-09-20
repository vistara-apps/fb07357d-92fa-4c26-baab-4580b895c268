/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['example.com', 'ipfs.io'],
    unoptimized: true
  },
  typescript: {
    ignoreBuildErrors: false
  },
  eslint: {
    ignoreDuringBuilds: false
  }
};

export default nextConfig;
