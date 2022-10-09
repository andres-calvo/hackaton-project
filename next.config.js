/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env:{
    WALLETCONNECTID:process.env.WALLETCONNECTID
  }
}

module.exports = nextConfig
