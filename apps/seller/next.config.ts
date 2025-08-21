
const nextConfig = {
    output: 'standalone',
    transpilePackages: ['@shopiew/ui', '@shopiew/shared'],
    eslint: {
        ignoreDuringBuilds: true,
    },
    typescript: {
        ignoreBuildErrors: true,
    },
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "placehold.co",
            },
            {
                protocol: "https",
                hostname: "fastly.picsum.photos",
            }
        ],
    }
};

module.exports = nextConfig;

export default nextConfig;
