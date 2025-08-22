
const nextConfig = {
    outputFileTracingRoot: __dirname,
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
    },
    output: 'standalone',

};

module.exports = nextConfig;

export default nextConfig;
