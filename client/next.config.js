/** @type {import('next').NextConfig} */
const nextConfig = {
	experimental: {
		appDir: true,
	},
	async rewrites() {
		return [
			{
				source: "/register",
				destination: "/",
			},
		];
	},
};

module.exports = nextConfig;
