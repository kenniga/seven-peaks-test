import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';

import LoadingSpinner from '@/src/components/LoadingSpinner';
import NewsSection from '@/src/components/NewsSection/NewsSection';

import { useInfinitePosts } from '@/api/usePosts';
import {
    NEWS_SECTION_PARAM_VALUE,
    ORDER_BY_PARAM_KEY,
    PAGE_PARAM_KEY,
    PAGE_SIZE_PARAM_KEY,
    Q_PARAM_KEY,
    SECTION_PARAM_KEY,
    SHOW_FIELDS_PARAM_KEY,
    SORT_NEWEST_VALUE
} from '@/src/constants';
import { FetchPostsProps } from '@/src/utils/fetchGuardianPost';

export default function SearchResult() {
    const router = useRouter();
    const query = router.query.q;
    const orderBy = router.query.orderBy;
    const PAGE_SIZE = 15;

    const orderByQuery = (): 'newest' | 'oldest' => {
        const isCorrectOrderValue = (value: string): value is 'newest' | 'oldest' => {
            return value === 'newest' || value === 'oldest';
        };

        if (orderBy && !Array.isArray(orderBy) && isCorrectOrderValue(orderBy)) {
            return orderBy;
        } else {
            return SORT_NEWEST_VALUE;
        }
    };

    const params: FetchPostsProps = {
        [Q_PARAM_KEY]: query as string,
        [SHOW_FIELDS_PARAM_KEY]: 'thumbnail',
        [PAGE_SIZE_PARAM_KEY]: PAGE_SIZE,
        [PAGE_PARAM_KEY]: 1,
        [ORDER_BY_PARAM_KEY]: orderByQuery(),
        [SECTION_PARAM_KEY]: NEWS_SECTION_PARAM_VALUE
    };

    const { data, size, setSize, error } = useInfinitePosts(params);

    const searchResults = data ? [].concat(...data) : [];
    const isLoadingInitialData = !data && !error;
    const isLoadingMore = isLoadingInitialData || (size > 0 && data && typeof data[size - 1] === 'undefined');

    useEffect(() => {
        function handleScroll() {
            if (
                window.innerHeight + window.scrollY >= document.body.offsetHeight - 500 &&
                data &&
                data.length > 0 &&
                !isLoadingMore
            ) {
                setSize(size + 1);
            }
        }
        window.addEventListener('scroll', handleScroll);

        return () => window.removeEventListener('scroll', handleScroll);
    }, [data, isLoadingMore]);

    return (
        <>
            <Head>
                <title>{`The Peaks - Search result for "${query}"`}</title>
                <meta name="description" content="Search result" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main>
                <div className="container">
                    <NewsSection data={searchResults} title="Search Result" />
                    {isLoadingMore && <LoadingSpinner isFullViewportHeight={false} />}
                </div>
            </main>
        </>
    );
}
