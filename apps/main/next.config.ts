
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "placehold.co",
            },
        ],
    },
    output: 'standalone',
    experimental: {
        outputFileTracingRoot: undefined,
    },
    transpilePackages: ['@shopiew/ui', '@shopiew/shared'],
    eslint: {
        ignoreDuringBuilds: true,
    },
    typescript: {
        ignoreBuildErrors: true,
    },
};

module.exports = nextConfig;

export default nextConfig;
