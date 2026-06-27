/** @type {import('next').NextConfig} */
const nextConfig = {
  // Emit a fully static site into out/ — no runtime server needed.
  output: "export",
  // styled-components SSR/SSG support (consistent class names + server styles).
  compiler: {
    styledComponents: true,
  },
  // next/image optimization needs a server; keep images as plain <img> output.
  images: {
    unoptimized: true,
  },
  // Export each route as out/<slug>/index.html for clean static hosting.
  trailingSlash: true,
};

export default nextConfig;
