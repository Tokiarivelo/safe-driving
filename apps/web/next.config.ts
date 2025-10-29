/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '4566',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'localhost',
        port: '4566',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: '**', // Autorise tous les domaines
      },
    ],
  },
};

export default nextConfig;
