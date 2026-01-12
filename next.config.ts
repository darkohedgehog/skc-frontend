import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

const isDev = process.env.NODE_ENV === "development";
const allowLocalImages = process.env.ALLOW_LOCAL_IMAGES === "true";

const nextConfig = {
  images: {
    remotePatterns: [
      ...(isDev || allowLocalImages
        ? [{
            protocol: "http" as const,
            hostname: "localhost",
            port: "1337",
            pathname: "/uploads/**",
          }]
        : []),

      {
        protocol: "https" as const,
        hostname: "res.cloudinary.com",
        pathname: "/dhkmlqg4o/**",
      },
      { protocol: "https" as const, hostname: "api.skcvukovar.hr" },
      { protocol: "https" as const, hostname: "www.skcvukovar.hr" },
    ],
    unoptimized: isDev,
    dangerouslyAllowLocalIP: !isDev && allowLocalImages, // ili (isDev || allowLocalImages) ako hoćeš
  },
};

export default withNextIntl(nextConfig);