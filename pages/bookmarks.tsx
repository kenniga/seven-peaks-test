import { useEffect, useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';

import NewsSection, { NewsSectionData } from '@/src/components/NewsSection';
import { BookmarkItem } from './article/[...id]';
import { BOOKMARKED_PAGES_LS_KEY, SORT_NEWEST_VALUE, SORT_OLDEST_VALUE } from '@/src/constants';

function sortBookmarkedData(array: BookmarkItem[], order = SORT_NEWEST_VALUE) {
    if (order === SORT_OLDEST_VALUE) {
        return array.sort((a, b) => {
            const comparatorADate = a.webPublicationDate;
            const comparatorBDate = b.webPublicationDate;

            if (!comparatorADate || !comparatorBDate) return 0;

            return +new Date(comparatorADate) - +new Date(comparatorBDate);
        });
    } else {
        return array.sort((a, b) => {
            const comparatorADate = a.webPublicationDate;
            const comparatorBDate = b.webPublicationDate;

            if (!comparatorADate || !comparatorBDate) return 0;

            return +new Date(comparatorBDate) - +new Date(comparatorADate);
        });
    }
}

export default function Bookmark() {
    const [data, setData] = useState<NewsSectionData[]>([]);
    const router = useRouter();

    useEffect(() => {
        const orderByQuery = (): string => {
            if (router.query?.orderBy && !Array.isArray(router.query.orderBy)) {
                return router.query.orderBy;
            } else {
                return SORT_NEWEST_VALUE;
            }
        };
        const bookmarkedPages = JSON.parse(localStorage.getItem(BOOKMARKED_PAGES_LS_KEY) || '[]');
        const sortedData = sortBookmarkedData(bookmarkedPages, orderByQuery());

        const bookmarkedData: NewsSectionData[] = sortedData.map((item: BookmarkItem) => {
            return {
                id: item.id,
                webTitle: item.webTitle,
                thumbnail: item.thumbnail
            };
        });

        setData(bookmarkedData);
    }, [router.query.orderBy]);

    return (
        <>
            <Head>
                <title>The Peaks - All Bookmark</title>
                <meta name="description" content="Your bookmarked pages" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main>
                <div className="container">
                    <NewsSection data={data} title="All Bookmarks" layout="grid" isWithBookmarkButton={false} />
                </div>
            </main>
        </>
    );
}
