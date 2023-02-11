module.exports = {
  reactStrictMode: true,
  transpilePackages: ["crmui"],
  generateBuildId: async () => {
    return 'videoservice-crm';
  },
  trailingSlash: false,
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '8000',
        pathname: '/media/**',
      },
    ],
  },
};
