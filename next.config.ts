import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    root: __dirname,
  },
  async redirects() {
    return [
      {
        source: "/blog/undefined",
        destination: "/blog",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
