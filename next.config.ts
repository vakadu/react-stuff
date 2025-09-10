import withBundleAnalyzer from '@next/bundle-analyzer';
import type { NextConfig } from 'next';

const withAnalyzer = withBundleAnalyzer({
	enabled: process.env.ANALYZE === 'true',
});

const nextConfig: NextConfig = {
	images: {
		domains: [],
	},
	reactStrictMode: false,
};

export default withAnalyzer(nextConfig);
