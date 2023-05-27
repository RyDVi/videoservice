// @ts-check

/**
 * @type {import('next').NextConfig}
 **/
module.exports = {
  async redirects() {
    return [
      {
        source: "/category",
        destination: "/",
        permanent: true,
      },
      {
        source: "/search",
        destination: "/",
        permanent: true,
      },
      // {
      //   source: "/login",
      //   destination: "/",
      //   permanent: true,
      //   has: [
      //     {
      //       type: "cookie",
      //       key: "access_token",
      //     },
      //   ],
      // },
    ];
  },
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
