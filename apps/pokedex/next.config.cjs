/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  reactStrictMode: true,
  transpilePackages: ["@monorepo/utils", "@monorepo/components"],
  experimental: {
    externalDir: true,
    typedRoutes: true,
  },
};

module.exports = nextConfig;
