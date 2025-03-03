/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  // Enable static optimization
  reactStrictMode: true,
  swcMinify: true,
};

export default nextConfig;
