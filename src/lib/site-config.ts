import { env } from '@/env.mjs';

export const siteConfig = {
	title: 'Vinod Kumar | Frontend Engineer',
	description:
		'Vinod Kumar is a frontend engineer specializing in React, JavaScript, and responsive web development. Passionate about building performant, accessible, and modern web interfaces.',
	keywords: () => [
		'vinod',
		'vinod kumar',
		'vakadu',
		'vakadu vinod',
		'Vinod Kumar Frontend Engineer',
		'Vinod Kumar Frontend Developer',
		'Vinod Kumar Web Developer',
		'vakadu Frontend Engineer',
		'vakadu Kumar Frontend Developer',
		'vakadu Kumar Web Developer',
		'Frontend Engineer',
		'Frontend Developer',
		'UI Developer',
		'Web Developer',
		'React Developer',
		'JavaScript Developer',
		'HTML CSS JavaScript',
		'Responsive Web Design',
		'Cross-Browser Compatibility',
		'Performance Optimization',
		'Typescript',
		'React',
	],
	url: () => env.APP_URL,
	//   googleSiteVerificationId: () => env.GOOGLE_SITE_VERIFICATION_ID || '',
};
