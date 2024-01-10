/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
        port: "",
        pathname: "**",
      },
    ],
    formats: ["image/avif", "image/webp"],
    domains: [
      "img.freepik.com",
      "images.pexels.com",
      "localhost",
      "static.vecteezy.com",
      "us.123rf.com",
      "i1.wp.com",
    ],
  },
};

module.exports = {
  nextConfig,
  env: {
    customKey: "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",
  },
};
