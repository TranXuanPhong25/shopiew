const path = require("path");

const nextConfig = {
	outputFileTracingRoot: path.join(__dirname, "../../"),
	turbopack: {
		root: path.join(__dirname, "../../"),
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
			},
		],
	},
	output: "standalone",
};

module.exports = nextConfig;

export default nextConfig;
