/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    // disable vendor chunk splitting to avoid dynamic chunk loading for maplibre
    config.optimization.splitChunks = {
      cacheGroups: {
        default: false,
        vendors: false,
      },
    };
    return config;
  },
  env: {
    NEXT_PUBLIC_MAPBOX_TOKEN: process.env.NEXT_PUBLIC_MAPBOX_TOKEN,
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  }
};
module.exports = nextConfig;
