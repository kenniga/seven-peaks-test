import { ReactNode } from 'react';
import { Roboto } from '@next/font/google';
import localFont from '@next/font/local';
import classNames from 'classnames';

import Nav from '../Nav';

import styles from './styles.module.scss';

const georgia = localFont({ src: './georgia.woff2' });

const roboto = Roboto({ weight: ['400', '500'], subsets: ['latin'] });

export default function Layout({ children }: { children: ReactNode }) {
    const layoutClassnames = classNames({
        [styles.layout]: true,
        [roboto.className]: true
    });

    return (
        <>
            <style jsx global>{`
                h1,
                h2,
                h3,
                h4,
                h5,
                h6 {
                    font-family: ${georgia.style.fontFamily};
                }
            `}</style>
            <div className={layoutClassnames}>
                <Nav />
                {children}
                <footer></footer>
            </div>
        </>
    );
}
