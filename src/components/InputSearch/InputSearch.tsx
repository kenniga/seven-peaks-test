import { useState } from 'react';
import Image from 'next/image';
import classNames from 'classnames';

import styles from './styles.module.scss';

interface Props {
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function InputSearch({ onChange }: Props) {
    const [isFocused, setIsFocused] = useState(false);
    const labelClassname = classNames(styles.label, {
        [styles.focused]: isFocused
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange(e);
    };

    return (
        <label
            htmlFor="search"
            className={labelClassname}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
        >
            <input
                name="search"
                className={styles.input}
                type="text"
                id="search"
                placeholder="Search all news"
                onChange={handleChange}
            />
            <Image src="/search-icon@2x.svg" className={styles.searchIcon} alt="Search Icon" width={17} height={17} />
        </label>
    );
}
