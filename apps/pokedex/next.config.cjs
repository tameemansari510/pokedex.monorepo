/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone", // ✅ THIS enables the .next/standalone folder
  reactStrictMode: true,
  transpilePackages: ["@monorepo/utils", "@monorepo/components"],
  experimental: {
    externalDir: true,
    typedRoutes: true,
  },
};

module.exports = nextConfig;
