import axios from 'axios';

import {
    ORDER_BY_PARAM_KEY,
    PAGE_PARAM_KEY,
    PAGE_SIZE_PARAM_KEY,
    Q_PARAM_KEY,
    SECTION_PARAM_KEY,
    SHOW_FIELDS_PARAM_KEY
} from '@/src/constants';

export interface FetchPostsProps {
    [SECTION_PARAM_KEY]?: string;
    [SHOW_FIELDS_PARAM_KEY]?: string;
    [PAGE_SIZE_PARAM_KEY]?: number;
    [PAGE_PARAM_KEY]?: number;
    [Q_PARAM_KEY]?: string;
    [ORDER_BY_PARAM_KEY]?: 'newest' | 'oldest';
}

export default async function fetchPosts(query: FetchPostsProps) {
    const url = process.env.NEXT_PUBLIC_GUARDIAN_POST_API_URL as string;
    const params = {
        'api-key': process.env.NEXT_PUBLIC_GUARDIAN_POST_API_KEY,
        ...query
    };

    const response = await axios.get(`${url}/search`, { params });

    return response.data.response;
}

export async function fetchPost(id: string) {
    const url = process.env.NEXT_PUBLIC_GUARDIAN_POST_API_URL as string;
    const params = {
        'api-key': process.env.NEXT_PUBLIC_GUARDIAN_POST_API_KEY,
        'show-fields': 'thumbnail,headline,body',
        'show-elements': 'all',
        'show-blocks': 'main'
    };

    const response = await axios.get(`${url}/${id}`, { params });

    return response.data.response;
}
