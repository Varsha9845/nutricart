/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.swav-berlin.de',
        port: '',
        pathname: '/images/Artikel-Bilder/2023/ernaehrung_fuer_sportler/gemuese_und_obst_im_sport.jpg',
      },
    ],
  },
}

export default nextConfig
