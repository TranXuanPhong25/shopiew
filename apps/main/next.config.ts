
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "placehold.co",
            },
            {
                protocol: "https",
                hostname: "picsum.photos",
            }
        ],
    },
    output: 'standalone',
};

module.exports = nextConfig;

export default nextConfig;
