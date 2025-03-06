/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  // Enable static optimization
  reactStrictMode: true,
  swcMinify: true,
  eslint: {
    dirs: ['app'],
  },
  // Server configuration
  server: {
    port: 3005,
  },
};

export default nextConfig;
