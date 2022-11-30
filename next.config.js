/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['links.papareact.com']
  },
  env:{
    mapbox_key: 'pk.eyJ1IjoicGF0aXRvayIsImEiOiJjbGIyaWphaGowNGp0M3BtdTl6b2VjeHY0In0.xyjYPe3bZXxl3ORcmtUo1Q'
  },
}

module.exports = nextConfig
