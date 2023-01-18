import { ChangeEvent, useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import classNames from 'classnames';

import InputSearch from '../InputSearch';

import useDebounce from '@/src/utils/useDebounce';
import styles from './styles.module.scss';

export default function Nav() {
    const [searchQuery, setSearchQuery] = useState<string>('');
    const navContainerClassnames = classNames('container', styles.navContainer);

    const router = useRouter();
    const { query } = router;

    const debouncedSearchQuery: string = useDebounce<string>(searchQuery, 500);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
    };

    useEffect(() => {
        if (debouncedSearchQuery) {
            router.push({
                pathname: 'search-result',
                query: { ...query, q: debouncedSearchQuery }
            });
        }
    }, [debouncedSearchQuery]);

    return (
        <nav className={styles.nav}>
            <div className={navContainerClassnames}>
                <Link href="/">
                    <Image
                        src="/Logo_White.png"
                        alt="Seven Peaks Logo"
                        className={styles.vercelLogo}
                        width={142}
                        height={56}
                    />
                </Link>
                <InputSearch onChange={handleChange} />
            </div>
        </nav>
    );
}
