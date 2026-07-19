/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  // Add this line to allow your local network IP
  allowedDevOrigins: ['192.168.100.8'],
}

export default nextConfig
