
/** @type {import('next').NextConfig} */

const nextConfig = {
  ...(process.env.NODE_ENV === 'production' && {
    typescript: {
      ignoreBuildErrors: true,
    },
    eslint: {
      ignoreDuringBuilds: true,
    },
  }),

  async redirects() {
    return [
      {
        source: '/',
        destination: '/authentication', // ✅ Establece /login como la página inicial
        permanent: true,
      },
    ];
  },

  images: {
    domains: ['blackrockdpto.net'],
  },
};

module.exports = nextConfig;