const { i18n } = require('./next-i18next.config');

module.exports = {
  i18n,
  publicRuntimeConfig: {
    theme: 'DEFAULT',
    currency: 'KGS',
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'livemeshop.com',
        port: '',
        pathname: '/media/**',
      },
    ],
  },
  env: {
    SERVER_URL: process.env.REACT_APP_SERVER_URL,
    SITE_URL: process.env.REACT_APP_SITE_URL,
    NEXTAUTH_SECRET: process.env.REACT_APP_NEXTAUTH_SECRET,
  },
};

// const withBundleAnalyzer = require("@next/bundle-analyzer")({
//   enabled: process.env.ANALYZE === "true",
// });

// module.exports = withBundleAnalyzer({
//   i18n,
//   devIndicators: {},
//   publicRuntimeConfig: {
//     // Available on both server and client
//     theme: "DEFAULT",
//     currency: "USD",
//   },
// });
