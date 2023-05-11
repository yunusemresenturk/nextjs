/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    basePath: process.env.NODE_ENV === 'production' ? '/nextjs' : '',
    publicRuntimeConfig: {
        contextPath: process.env.NODE_ENV === 'production' ? '/nextjs' : '',
    },
};

module.exports = nextConfig;
