/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: { unoptimized: true },
  // Turbopack: mock Node-only modules that mapbox-gl references but never runs in the browser
  experimental: {
    turbo: {
      resolveAliases: {
        fs: { browser: './lib/empty-module.js' },
        net: { browser: './lib/empty-module.js' },
        tls: { browser: './lib/empty-module.js' },
      },
    },
  },
  // Webpack fallback kept for `next build`
  webpack: (config) => {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      net: false,
      tls: false,
    };
    return config;
  },
};

module.exports = nextConfig;
