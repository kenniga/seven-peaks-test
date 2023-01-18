import Head from 'next/head';
import { GetServerSideProps } from 'next';

import NewsSection from '@/src/components/NewsSection';
import { NewsSectionData } from '@/src/components/NewsSection/NewsSection';

import fetchPosts, { FetchPostsProps } from '@/src/utils/fetchGuardianPost';

import {
    NEWS_SECTION_PARAM_VALUE,
    ORDER_BY_PARAM_KEY,
    PAGE_SIZE_PARAM_KEY,
    SECTION_PARAM_KEY,
    SHOW_FIELDS_PARAM_KEY,
    SORT_NEWEST_VALUE
} from '@/src/constants';
import styles from '@/styles/Home.module.scss';

interface Props {
    topStories: NewsSectionData[];
    categoryNews: NewsSectionData[];
}

const SHOW_FIELDS_THUMBNAIL_BODYTEXT_VALUE = 'thumbnail,bodyText';
const SHOW_FIELDS_THUMBNAIL_VALUE = 'thumbnail';
const SPORT_SECTION_PARAM_VALUE = 'sport';

export default function Home({ topStories, categoryNews }: Props) {
    return (
        <>
            <Head>
                <title>The Peaks - Home</title>
                <meta name="description" content="Your daily news" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main>
                <div className="container">
                    <NewsSection data={topStories} title="Top Stories" layout="topStories" />
                    <NewsSection
                        className={styles.categoryNewsSection}
                        data={categoryNews}
                        title="Sports"
                        layout="grid"
                        isWithFilter={false}
                    />
                </div>
            </main>
        </>
    );
}

export const getServerSideProps: GetServerSideProps<Props> = async ({ query }) => {
    const orderByQuery = (): 'newest' | 'oldest' => {
        const isCorrectOrderValue = (value: string): value is 'newest' | 'oldest' => {
            return value === 'newest' || value === 'oldest';
        };

        if (query.orderBy && !Array.isArray(query.orderBy) && isCorrectOrderValue(query.orderBy)) {
            return query.orderBy;
        } else {
            return SORT_NEWEST_VALUE;
        }
    };

    const topStoriesParams: FetchPostsProps = {
        [SECTION_PARAM_KEY]: NEWS_SECTION_PARAM_VALUE,
        [SHOW_FIELDS_PARAM_KEY]: SHOW_FIELDS_THUMBNAIL_BODYTEXT_VALUE,
        [PAGE_SIZE_PARAM_KEY]: 8,
        [ORDER_BY_PARAM_KEY]: orderByQuery()
    };

    const categoryNewsParams = {
        [SECTION_PARAM_KEY]: SPORT_SECTION_PARAM_VALUE,
        [SHOW_FIELDS_PARAM_KEY]: SHOW_FIELDS_THUMBNAIL_VALUE,
        [PAGE_SIZE_PARAM_KEY]: 3
    };

    const topStoriesResponse = await fetchPosts(topStoriesParams);
    const categoryNewsResponse = await fetchPosts(categoryNewsParams);

    const topStoriesResults = topStoriesResponse.results;
    const categoryNewsResults = categoryNewsResponse.results;
    const topStories = topStoriesResults.map((item: any) => {
        return {
            id: item.id,
            webTitle: item.webTitle,
            body: item.fields?.bodyText ?? null,
            thumbnail: item.fields?.thumbnail ?? null
        };
    });
    const categoryNews = categoryNewsResults.map((item: any) => {
        return {
            id: item.id,
            webTitle: item.webTitle,
            thumbnail: item.fields?.thumbnail ?? null
        };
    });

    return {
        props: {
            topStories,
            categoryNews
        }
    };
};
