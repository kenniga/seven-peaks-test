import classNames from 'classnames';
import Image from 'next/image';

import styles from './styles.module.scss';

export interface Props {
    title: string;
    thumbnail?: string;
    url: string;
    body?: string;
}

export default function Card({ title, thumbnail, url, body }: Props) {
    const imgClassname = classNames({
        [styles.img]: true,
        [styles.noThumbnail]: !thumbnail
    });

    const imgSrc = thumbnail ? thumbnail : '/Logo_White.png';

    return (
        <div className={styles.card}>
            <Image src={imgSrc} alt={title} className={imgClassname} width={625} height={474} />
            <div className={styles.content}>
                <h3>
                    <a title={title} href={`article/${url}`}>
                        {title}
                    </a>
                </h3>
                {!!body && <p>{body}</p>}
            </div>
        </div>
    );
}
