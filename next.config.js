/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Desactivar la caché estática
  staticPageGenerationTimeout: 0,
  // Añadir encabezados para evitar el almacenamiento en caché del navegador
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'no-store, max-age=0',
          },
        ],
      },
    ];
  },
  images: {
    domains: ['localhost'],
  },
}

module.exports = nextConfig