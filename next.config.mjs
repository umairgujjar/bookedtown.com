/** @type {import('next').NextConfig} */
// Static export: deploys to Vercel or Cloudflare Pages with no server.
const nextConfig = {
  output: "export",
  images: { unoptimized: true },
  trailingSlash: false,
};
export default nextConfig;
