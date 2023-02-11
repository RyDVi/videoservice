module.exports = {
  reactStrictMode: true,
  transpilePackages: ["@modules/*"],
  generateBuildId: async () => {
    return "videoservice-client";
  },
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "192.168.31.51",
        port: "8000",
      },
      {
        protocol: "http",
        hostname: "localhost",
        port: "8000",
        pathname: "/media/**",
      },
    ],
  },
};
