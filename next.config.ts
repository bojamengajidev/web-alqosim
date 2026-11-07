import type { NextConfig } from "next";

const strapiUrl =
  process.env.STRAPI_URL ||
  process.env.NEXT_PUBLIC_STRAPI_URL ||
  "https://cms.masjidalqosim.com";

function getStrapiImagePatterns() {
  try {
    const url = new URL(strapiUrl);
    const protocol = url.protocol.replace(":", "") as "http" | "https";

    return [
      {
        protocol,
        hostname: url.hostname,
        port: url.port || undefined,
        pathname: "/uploads/**",
      },
    ];
  } catch {
    return [];
  }
}

const nextConfig: NextConfig = {
  trailingSlash: false,
  compress: true,
  reactStrictMode: true,
  images: {
    remotePatterns: getStrapiImagePatterns(),
  },

  async redirects() {
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
