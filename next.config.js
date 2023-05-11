/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    basePath: '/project', // base path of the project
    publicRuntimeConfig: {
        contextPath: process.env.NODE_ENV === 'production' ? '/nextjs' : '',
    },
};

module.exports = nextConfig;
