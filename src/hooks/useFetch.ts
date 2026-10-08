import { useEffect, useState } from 'react';

interface FetchState<T> {
  data: T | null;
  isLoading: boolean;
  error: string | null;
}

export function useFetch<T>(fetcher: () => Promise<T>, deps: ReadonlyArray<unknown> = []): FetchState<T> {
  const [state, setState] = useState<FetchState<T>>({ data: null, isLoading: true, error: null });

  useEffect(() => {
    let isCancelled = false;

    setState({ data: null, isLoading: true, error: null });

    fetcher()
      .then((data) => {
        if (!isCancelled) {
          setState({ data, isLoading: false, error: null });
        }
      })
      .catch((error: unknown) => {
        if (!isCancelled) {
          const message = error instanceof Error ? error.message : 'Erreur inconnue';
          setState({ data: null, isLoading: false, error: message });
        }
      });

    return () => {
      isCancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return state;
}
