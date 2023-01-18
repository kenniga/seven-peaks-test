import { useState, useEffect } from 'react';
import { InferGetServerSidePropsType, GetServerSideProps } from 'next';
import Head from 'next/head';

import Button from '@/src/components/Button';
import BookmarkIcon from '@/src/components/Icon/BookmarkIcon';
import MediaRenderer from '@/src/components/MediaRenderer';
import Toast from '@/src/components/Toast';

import errorHandler from '@/src/utils/errorHandler';
import { fetchPost } from '@/src/utils/fetchGuardianPost';

import { BOOKMARKED_PAGES_LS_KEY } from '@/src/constants';
import styles from '@/styles/Article.module.scss';

interface MediaProps {
    type: 'audio' | 'video' | 'image';
    source: string;
    mediaData: any;
}
interface ArticleProps {
    thumbnail?: string;
    id: string;
    webTitle: string;
    webPublicationDate: string;
    headline?: string;
    media: MediaProps;
    body: string;
}

export interface BookmarkItem {
    id: string;
    thumbnail?: string;
    webTitle: string;
    webPublicationDate: string;
}

interface ToastContentProps {
    actionType: 'save' | 'remove';
}

const ToastContent = ({ actionType }: ToastContentProps) => {
    const text = actionType === 'save' ? 'Saved to Bookmarks' : 'Removed From Bookmarks';
    const iconType = actionType === 'save' ? 'filled' : 'outline';
    return (
        <div className={styles.toastContent}>
            <BookmarkIcon type={iconType} size={13} />
            {text}
        </div>
    );
};

export default function Article({ data }: InferGetServerSidePropsType<typeof getServerSideProps>) {
    const { webTitle, webPublicationDate, headline, media, body, id, thumbnail } = data;
    const [isBookmarked, setBookmarkStatus] = useState(false);
    const [isToastOpen, toggleToastOpen] = useState(false);

    useEffect(() => {
        const bookmarkedPages = JSON.parse(localStorage.getItem(BOOKMARKED_PAGES_LS_KEY) || '[]');
        const isPageAlreadyBookmarked = bookmarkedPages.find((page: BookmarkItem) => page.id === id);
        if (isPageAlreadyBookmarked) {
            setBookmarkStatus(true);
        }
    }, [id]);

    const handleToastClose = () => {
        toggleToastOpen(false);
    };

    const handleBookmarkClick = () => {
        let bookmarkedPages = JSON.parse(localStorage.getItem(BOOKMARKED_PAGES_LS_KEY) || '[]');

        const isPageAlreadyBookmarked = bookmarkedPages.find((page: BookmarkItem) => page.id === id);

        if (isPageAlreadyBookmarked) {
            bookmarkedPages = bookmarkedPages.filter((page: BookmarkItem) => page.id !== id);
            localStorage.setItem(BOOKMARKED_PAGES_LS_KEY, JSON.stringify(bookmarkedPages));
            setBookmarkStatus(false);
            return;
        }
        const bookmarkItem: BookmarkItem = {
            id,
            thumbnail,
            webTitle,
            webPublicationDate
        };

        bookmarkedPages.push(bookmarkItem);
        localStorage.setItem(BOOKMARKED_PAGES_LS_KEY, JSON.stringify(bookmarkedPages));
        setBookmarkStatus(true);
        toggleToastOpen(true);
    };

    const bookmarkStatus: {
        bookmarkButtonText: string;
        toastActionType: 'save' | 'remove';
        toastVariant: 'positive' | 'negative';
    } = {
        bookmarkButtonText: isBookmarked ? 'Remove Bookmark' : 'Add Bookmark',
        toastActionType: isBookmarked ? 'save' : 'remove',
        toastVariant: isBookmarked ? 'positive' : 'negative'
    };
    return (
        <>
            <Head>
                <title>{webTitle}</title>
                <meta name="description" content="Your daily news" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main>
                <div className="container">
                    <div className={styles.content}>
                        <Button onClick={handleBookmarkClick} icon={<BookmarkIcon size={11} type="filled" />}>
                            {bookmarkStatus.bookmarkButtonText}
                        </Button>
                        <p className={styles.publicationDate}>{webPublicationDate}</p>
                        <h2 className={styles.title}>{webTitle}</h2>
                        {headline && <h3 className={styles.headline}>{headline}</h3>}
                    </div>
                    <div className={styles.row}>
                        <div className={styles.body} dangerouslySetInnerHTML={{ __html: body }} />
                        {media.type && (
                            <div className={styles.media}>
                                <MediaRenderer source={media.source} type={media.type} mediaData={media.mediaData} />
                            </div>
                        )}
                    </div>
                </div>
            </main>
            <Toast
                deleteTime={5000}
                variant={bookmarkStatus.toastVariant}
                isOpen={isToastOpen}
                onClose={handleToastClose}
            >
                <ToastContent actionType={bookmarkStatus.toastActionType} />
            </Toast>
        </>
    );
}

export const getServerSideProps: GetServerSideProps<{ data: ArticleProps }> = async (ctx) => {
    const { id } = ctx.query;
    if (!id || !Array.isArray(id)) {
        return {
            redirect: {
                destination: '/',
                permanent: false
            }
        };
    }

    try {
        const postResponse = await fetchPost(id.join('/'));

        const media = {
            type: postResponse?.content?.blocks?.main?.elements[0].type || null,
            source: postResponse?.content?.blocks?.main?.elements[0]?.assets[0]?.file || null,
            mediaData: postResponse?.content?.blocks?.main?.elements[0] || null
        };
        const date = new Date(postResponse?.content.webPublicationDate);
        const options: Intl.DateTimeFormatOptions = {
            weekday: 'short',
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            timeZoneName: 'short'
        };
        const webPublicationDate = date.toLocaleString('en-US', options);

        const data = {
            thumbnail: postResponse?.content?.fields?.thumbnail || '',
            id: postResponse?.content?.id || '',
            webTitle: postResponse?.content?.webTitle || '',
            webPublicationDate,
            headline: postResponse?.content?.fields?.headline || '',
            media,
            body: postResponse?.content?.fields?.body || ''
        };

        return {
            props: {
                data
            }
        };
    } catch (error) {
        const normalizedError = errorHandler(error);
        return {
            notFound: true,
            props: {
                error: normalizedError
            }
        };
    }
};
