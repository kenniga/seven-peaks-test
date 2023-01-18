import { ReactNode, useEffect, useState } from 'react';
import classNames from 'classnames';
import styles from './styles.module.scss';

interface Props {
    children: ReactNode;
    deleteTime: number;
    variant?: 'positive' | 'negative';
    onClose: () => void;
    isOpen: boolean;
}

export default function Toast({ children, variant = 'positive', deleteTime, onClose, isOpen }: Props) {
    const [isShow, toggleShow] = useState(isOpen);

    useEffect(() => {
        const interval = setInterval(() => {
            if (isShow) {
                toggleShow(false);
                onClose();
            }
        }, deleteTime);

        return () => {
            clearInterval(interval);
        };

        // eslint-disable-next-line
    }, [isShow]);

    useEffect(() => {
        toggleShow(isOpen);
    }, [isOpen]);

    const toastClassnames = classNames(styles.toast, {
        [styles.positive]: variant === 'positive',
        [styles.negative]: variant === 'negative',
        [styles.isShow]: isShow
    });

    return <div className={toastClassnames}>{children}</div>;
}
