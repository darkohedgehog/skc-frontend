// next.config.ts
import createNextIntlPlugin from 'next-intl/plugin';
import type { NextConfig } from 'next';

const withNextIntl = createNextIntlPlugin();

const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'http' as const,
        hostname: 'localhost',
      },
      {
        protocol: 'https' as const,
        hostname: 'res.cloudinary.com',
        pathname: '/dhkmlqg4o/**',
      },
      {
        protocol: 'https' as const,
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https' as const,
        hostname: 'assets.aceternity.com',
      },
      {
        protocol: 'https' as const,
        hostname: 'api.microlink.io',
      },
      {
        protocol: 'https' as const,
        hostname: 'api.skcvukovar.hr',
      },
      {
        protocol: 'https' as const,
        hostname: 'www.skcvukovar.hr',
      },
    ],

    // 🔑 Ovo: u dev-u ne koristi Next image proxy
    unoptimized: process.env.NODE_ENV === 'development',
  },
} satisfies NextConfig;

export default withNextIntl(nextConfig);