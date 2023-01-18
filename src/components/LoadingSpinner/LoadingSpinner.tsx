import classNames from 'classnames';
import styles from './styles.module.scss';

interface Props {
    isFullViewportHeight?: boolean;
}
export default function LoadingSpinner({ isFullViewportHeight = true }: Props) {
    const wrapperClassname = classNames(styles.spinnerWrapper, {
        [styles.fullViewportHeight]: isFullViewportHeight
    });
    return (
        <div className={wrapperClassname}>
            <div className={styles.spinner}>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
        </div>
    );
}
