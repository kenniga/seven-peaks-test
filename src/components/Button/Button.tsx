import { ReactNode } from 'react';
import styles from './styles.module.scss';

interface Props {
    icon?: JSX.Element;
    iconPosition?: 'left' | 'right';
    children: ReactNode;
    href?: string;
    onClick?: () => void;
}

export default function Button({ children, href, icon, iconPosition = 'left', onClick }: Props): JSX.Element {
    const Tag = href ? 'a' : 'button';

    return (
        <Tag className={styles.button} href={href} onClick={onClick}>
            <>
                {icon && iconPosition === 'left' && icon}
                {children}
                {icon && iconPosition === 'right' && icon}
            </>
        </Tag>
    );
}
