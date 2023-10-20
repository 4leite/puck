module.exports = {
  reactStrictMode: true,
  transpilePackages: ["@measured/puck"],
  experimental: {
    serverComponentsExternalPackages: ["libsql"],
    serverActions: true,
  },
};
