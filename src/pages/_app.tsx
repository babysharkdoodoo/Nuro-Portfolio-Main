import splitbee from '@splitbee/web';
import { Analytics } from '@vercel/analytics/react';
import 'inter-ui/inter.css';
import { ThemeProvider } from 'next-themes';
import { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import { useEffectOnce, useEvent } from 'react-use';
import 'windi.css';
import '~/components/globals.css';
import { colors, useClick } from '~/lib';
import { Theme } from '~/types';

// Now we can add the component in return () code should look like this.

export { reportWebVitals } from 'next-axiom';

export default function App({ Component, pageProps }: AppProps): JSX.Element {
	const router = useRouter();
	const [play] = useClick();

	useEvent('mousedown', () => play());
	//useEvent('mouseup', () => play());

	useEffectOnce(() => {
		router.events.on('routeChangeStart', () => NProgress.start());
		router.events.on('routeChangeComplete', () => NProgress.done());
		router.events.on('routeChangeError', () => NProgress.done());

		if (process.env.NODE_ENV === 'production')
			splitbee.init({
				disableCookie: true,
			});
	});

	return (
		<ThemeProvider attribute="class" defaultTheme={Theme.SYSTEM} themes={Object.values(Theme)}>
			{/*<CustomCursor />*/}

			<Analytics />
			<Component {...pageProps} className="hide-cursor" />
			<style jsx global>{`
				#nprogress .bar {
					height: 0.25rem;
					background-color: ${colors.primary[500]};
				}
			`}</style>
		</ThemeProvider>
	);
}
