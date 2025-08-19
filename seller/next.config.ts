
const nextConfig = {
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
