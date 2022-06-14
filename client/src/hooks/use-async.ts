import { DependencyList, useEffect } from 'react';
import { useAsyncAction } from './use-async-action';

export function useAsync<T>(
    action: () => Promise<T>,
    dependencies: DependencyList
) {
    const { trigger, data, loading, error } = useAsyncAction(action);

    useEffect(() => trigger(), dependencies);

    const reload = () => {
        trigger();
    }

    return { data, reload, loading, error };
}