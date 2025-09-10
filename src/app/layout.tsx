import '@/styles/globals.css';

import type { Metadata } from 'next';

import { ThemeProvider } from '@/components/theme-provider';
import { ThemeSwitcher } from '@/components/theme-switcher';
import { fonts } from '@/lib/fonts';
import { siteConfig } from '@/lib/site-config';
import { cn } from '@/lib/utils';

export const generateMetadata = (): Metadata => ({
	metadataBase: new URL(siteConfig.url()),
	title: {
		default: siteConfig.title,
		template: `%s | ${siteConfig.title}`,
	},
	description: siteConfig.description,
	keywords: siteConfig.keywords(),
	robots: { index: true, follow: true },
	icons: {
		icon: '/favicon/favicon.ico',
		shortcut: '/favicon/favicon-16x16.png',
		apple: '/favicon/apple-touch-icon.png',
	},
	verification: {
		// google: siteConfig.googleSiteVerificationId(),
	},
	openGraph: {
		url: siteConfig.url(),
		title: siteConfig.title,
		description: siteConfig.description,
		siteName: siteConfig.title,
		images: '/favicon/android-chrome-512x512.png',
		type: 'website',
	},
	twitter: {
		card: 'summary_large_image',
		title: siteConfig.title,
		description: siteConfig.description,
		images: '/favicon/android-chrome-512x512.png',
	},
});

const RootLayout = async ({ children }: { children: React.ReactNode }) => {
	return (
		<html suppressHydrationWarning>
			<body className={cn('min-h-screen font-sans text-black', fonts)}>
				<ThemeProvider
					attribute="class"
					forcedTheme="light"
					enableSystem={false}
				>
					{children}
					<ThemeSwitcher className="absolute right-5 bottom-5 z-10" />
				</ThemeProvider>
			</body>
		</html>
	);
};

export default RootLayout;
