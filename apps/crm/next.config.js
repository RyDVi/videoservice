// @ts-check

/**
 * @type {import('next').NextConfig}
 **/
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/",
        destination: "/login",
        permanent: true,
      },
      {
        source: "/crm",
        destination: "/crm/home",
        permanent: true,
      },
      {
        source: "/login",
        destination: "/crm/home",
        permanent: false,
        has: [
          {
            type: "cookie",
            key: "access_token",
          },
        ],
      },
      {
        source: "/crm/(.*)",
        destination: "/login",
        permanent: false,
        missing: [
          {
            type: "cookie",
            key: "access_token",
          },
        ],
      },
    ];
  },
  reactStrictMode: true,
  transpilePackages: ["crmui", "@modules/*"],
  generateBuildId: async () => {
    return "videoservice-crm";
  },
  trailingSlash: false,
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "8000",
        pathname: "/media/**",
      },
    ],
  },
};

module.exports = nextConfig;
