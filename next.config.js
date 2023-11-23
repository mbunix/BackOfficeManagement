/** @type {import('next').NextConfig} */
const nextConfig = {
  publicRuntimeConfig: {
    apiUrl: process.env.API_URL
    // Add other configuration variables here
  }
}

module.exports = nextConfig
