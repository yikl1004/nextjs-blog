import React from 'react';
import type { AppProps } from 'next/app';
import { AuthProvider } from '@components/Auth';
import '../styles/global.css';

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
	return (
		<AuthProvider>
			<Component {...pageProps} />
		</AuthProvider>
	);
};

export default MyApp;
