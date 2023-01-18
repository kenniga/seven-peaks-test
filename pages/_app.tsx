import { useEffect, useState } from 'react';
import Router from 'next/router';
import type { AppProps } from 'next/app';

import Layout from '../src/components/Layout';
import LoadingSpinner from '@/src/components/LoadingSpinner';

import '@/styles/globals.scss';

export default function App({ Component, pageProps }: AppProps) {
    const [isLoading, setLoading] = useState(false);
    useEffect(() => {
        const start = () => {
            setLoading(true);
        };
        const end = () => {
            setLoading(false);
        };
        Router.events.on('routeChangeStart', start);
        Router.events.on('routeChangeComplete', end);
        Router.events.on('routeChangeError', end);

        return () => {
            Router.events.off('routeChangeStart', start);
            Router.events.off('routeChangeComplete', end);
            Router.events.off('routeChangeError', end);
        };
    }, []);

    return <Layout>{isLoading ? <LoadingSpinner /> : <Component {...pageProps} />}</Layout>;
}
