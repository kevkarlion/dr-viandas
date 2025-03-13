/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['localhost', 'res.cloudinary.com'], // Agrega los dominios permitidos
  },
};

module.exports = nextConfig;
