import { ChangeEventHandler } from 'react';
import { useRouter } from 'next/router';
import classNames from 'classnames';

import Button from '../Button';
import Card from '../Card';
import { BookmarkIcon } from '../Icon';
import Select from '../Select';

import { SORT_NEWEST_LABEL, SORT_NEWEST_VALUE, SORT_OLDEST_LABEL, SORT_OLDEST_VALUE } from '@/src/constants';
import styles from './styles.module.scss';

export interface NewsSectionData {
    webTitle: string;
    body?: string;
    thumbnail?: string;
    id: string;
}
interface Props {
    title: string;
    data: NewsSectionData[];
    layout?: 'topStories' | 'grid';
    className?: string;
    isWithFilter?: boolean;
    isWithBookmarkButton?: boolean;
}

export default function NewsSection({
    className,
    title,
    data,
    layout = 'grid',
    isWithFilter = true,
    isWithBookmarkButton = true
}: Props) {
    const router = useRouter();
    const FILTER_OPTIONS = [
        { value: SORT_NEWEST_VALUE, label: SORT_NEWEST_LABEL },
        { value: SORT_OLDEST_VALUE, label: SORT_OLDEST_LABEL }
    ];

    const selectedFilter = FILTER_OPTIONS.find((option) => option.value === router.query.orderBy) || FILTER_OPTIONS[0];
    const newsSectionClassnames = classNames(styles.newsSection, className);

    const newsLayoutClassnames = classNames({
        [styles.topStories]: layout === 'topStories',
        [styles.grid]: layout === 'grid'
    });

    const handleChange: ChangeEventHandler<HTMLSelectElement> = (event) => {
        router.push({
            pathname: router.pathname,
            query: { ...router.query, orderBy: event.target.value }
        });
    };
    const Filters = () => {
        return (
            <div className={styles.filters}>
                {isWithBookmarkButton && (
                    <Button href="/bookmarks" icon={<BookmarkIcon size={11} type="filled" />}>
                        View Bookmark
                    </Button>
                )}
                <Select
                    options={FILTER_OPTIONS}
                    className={styles.select}
                    onChange={handleChange}
                    defaultValue={selectedFilter.value}
                />
            </div>
        );
    };

    return (
        <div className={newsSectionClassnames}>
            <div className={styles.header}>
                <h2>{title}</h2>
                {isWithFilter && <Filters />}
            </div>
            <div className={newsLayoutClassnames}>
                {data.map((item) => {
                    const body = layout === 'topStories' ? item.body : '';

                    return (
                        <Card
                            title={item.webTitle}
                            thumbnail={item.thumbnail}
                            url={item.id}
                            body={body}
                            key={item.id}
                        />
                    );
                })}
            </div>
        </div>
    );
}
