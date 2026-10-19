import { useEffect, useState } from 'react';
import { getErrorMessage } from '@/lib/errors.ts';

interface FetchState<T> {
    data: T | null;
    isLoading: boolean;
    error: string | null;
}

export function useFetch<T>(fetcher: () => Promise<T>): FetchState<T> {
    const [state, setState] = useState<FetchState<T>>({data: null, isLoading: true, error: null});

    useEffect(() => {
        let isCancelled = false;

        setState({data: null, isLoading: true, error: null});

        fetcher()
            .then((data) => {
                if (!isCancelled) {
                    setState({data, isLoading: false, error: null});
                }
            })
            .catch((error: unknown) => {
                if (!isCancelled) {
                    const message = getErrorMessage(error);
                    setState({data: null, isLoading: false, error: message});
                }
            });

        return () => {
            isCancelled = true;
        };

    }, [fetcher]);

    return state;
}
