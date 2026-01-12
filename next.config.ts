// next.config.ts
import createNextIntlPlugin from "next-intl/plugin";
import type { NextConfig } from "next";

const withNextIntl = createNextIntlPlugin();

// ✅ Omogućavaš samo kada ti baš treba (lokalni prod start)
const allowLocalImages =
  process.env.NODE_ENV === "production" && process.env.ALLOW_LOCAL_IMAGES === "true";

const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      // Local Strapi (dodaj port + uploads path da bude precizno)
      {
        protocol: "http" as const,
        hostname: "localhost",
        port: "1337",
        pathname: "/uploads/**",
      },

      {
        protocol: "https" as const,
        hostname: "res.cloudinary.com",
        pathname: "/dhkmlqg4o/**",
      },
      { protocol: "https" as const, hostname: "api.skcvukovar.hr" },
      { protocol: "https" as const, hostname: "www.skcvukovar.hr" },
    ],

    // 🔑 Dev: ne koristi Next image proxy (kao što već imaš)
    unoptimized: process.env.NODE_ENV === "development",

    // 🔥 Next 16: dozvoli localhost/private IP fetch SAMO kad eksplicitno kažeš
    dangerouslyAllowLocalIP: allowLocalImages,
  },
} satisfies NextConfig;

export default withNextIntl(nextConfig);