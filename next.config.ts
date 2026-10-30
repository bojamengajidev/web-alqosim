import type { NextConfig } from "next";

const wordpressHostname = process.env.WORDPRESS_HOSTNAME;
const wordpressUrl = process.env.WORDPRESS_URL;

const remotePatterns = wordpressHostname
  ? [
      {
        protocol: "https" as const,
        hostname: wordpressHostname,
        pathname: "/wp-content/uploads/**",
      },
      {
        protocol: "http" as const,
        hostname: wordpressHostname,
        pathname: "/wp-content/uploads/**",
      },
    ]
  : [];

const nextConfig: NextConfig = {
  trailingSlash: false,
  compress: true,
  reactStrictMode: true,
  images: {
    remotePatterns,
  },

  async redirects() {
    if (!wordpressUrl) {
      return [];
    }
    return [
      {
        source: "/admin",
        destination: `${wordpressUrl}/wp-admin`,
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
