import useSWR from 'swr';
import useSWRInfinite from 'swr/infinite';

import axiosInstance from './axiosStore';
import { FetchPostsProps } from '@/src/utils/fetchGuardianPost';

export default function usePosts(params: FetchPostsProps) {
    const fetcher = async (props: [string, FetchPostsProps]) => {
        const [url, args] = props;
        const res = await axiosInstance.get(url, { params: args });
        return res.data.response;
    };

    const { data, error, isLoading } = useSWR([`/search`, params], fetcher);

    const postsData =
        !isLoading && data && data.results.length > 0
            ? data.results.map((item: any) => {
                  return {
                      id: item.id,
                      webTitle: item.webTitle,
                      body: item.fields?.bodyTextSummary ?? null,
                      thumbnail: item.fields?.thumbnail ?? null
                  };
              })
            : [];
    return {
        data: postsData,
        isLoading,
        isError: error
    };
}

export function useInfinitePosts(params: FetchPostsProps) {
    const fetcher = async (props: [string, FetchPostsProps]) => {
        const [url, args] = props;
        const res = await axiosInstance.get(url, { params: args });

        const results = res.data.response.results.map((item: any) => {
            return {
                id: item.id,
                webTitle: item.webTitle,
                body: item.fields?.bodyTextSummary ?? null,
                thumbnail: item.fields?.thumbnail ?? null
            };
        });

        return results;
    };

    const { data, error, isLoading, size, setSize } = useSWRInfinite(
        (index) => ['/search', { ...params, page: index + 1 }],
        fetcher
    );

    return {
        data,
        isLoading,
        error,
        setSize,
        size
    };
}
