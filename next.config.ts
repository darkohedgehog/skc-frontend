import { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

// Postavljanje next-intl plugina
const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  reactStrictMode: true,
    images: {
        remotePatterns: [
          {
            protocol: "http",
            hostname: "localhost",
          },
          {
            protocol: "https",
            hostname: "res.cloudinary.com",
            pathname: "/dhkmlqg4o/**",
          },
          {
            protocol: "https",
            hostname: "images.unsplash.com",
            
          },
          {
            protocol: "https",
            hostname: "assets.aceternity.com",
          },
          {
            protocol: "https",
            hostname: "api.microlink.io",
          },
          {
            protocol: "https",
            hostname: "api.skcvukovar.hr",
          },
          {
            protocol: "https",
            hostname: "www.skcvukovar.hr",
          },
        ],
      },
};

export default withNextIntl(nextConfig);