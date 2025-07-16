import { StrictMode } from "react";

const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "placehold.co",
            },
        ],
    }
};

module.exports = nextConfig;

export default nextConfig;
