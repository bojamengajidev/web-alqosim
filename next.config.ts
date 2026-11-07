import type { NextConfig } from "next";

const strapiUrl = process.env.STRAPI_URL;

const strapiHostname = (() => {
  if (!strapiUrl) return undefined;

  try {
    return new URL(strapiUrl).hostname;
  } catch {
    return undefined;
  }
})();

const remotePatterns = [
  ...(strapiHostname
    ? [
        {
          protocol: "https" as const,
          hostname: strapiHostname,
          pathname: "/uploads/**",
        },
        {
          protocol: "http" as const,
          hostname: strapiHostname,
          pathname: "/uploads/**",
        },
      ]
    : []),
  {
    protocol: "http" as const,
    hostname: "localhost",
    port: "1337",
    pathname: "/uploads/**",
  },
  {
    protocol: "http" as const,
    hostname: "127.0.0.1",
    port: "1337",
    pathname: "/uploads/**",
  },
];

const nextConfig: NextConfig = {
  trailingSlash: false,
  compress: true,
  reactStrictMode: true,
  images: {
    remotePatterns,
  },

  async redirects() {
    if (!strapiUrl) {
      return [];
    }

    return [
      {
        source: "/admin",
        destination: `${strapiUrl}/admin`,
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
