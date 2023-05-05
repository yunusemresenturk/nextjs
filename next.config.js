    /** @type {import('next').NextConfig} */
    const nextConfig = {
        reactStrictMode: true,
        swcMinify: true,
        basePath: process.env.NODE_ENV === 'production' ? '/nextjs' : '',
        publicRuntimeConfig: {
            contextPath: process.env.NODE_ENV === 'production' ? '/nextjs' : '',
            /* uploadPath: process.env.NODE_ENV === 'production' ? '/nextjs/upload.php' : '/api/upload', */
        },
/*         distDir: 'dev/resources/build',*/    
};

    module.exports = nextConfig;
