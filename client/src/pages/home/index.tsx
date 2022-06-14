import { useCallback, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useUserPreferences } from '../../context/user-preferences';
import { GameCards } from '../games/game-cards';
import { StoreNavigation } from '../../components/store-navigation';
import styles from './home.module.css';

export interface HomeSearchState {
    searchText: string;
    page: string;
    gamesOnPage: string;
}

function stateToParams(state: HomeSearchState): URLSearchParams {
    return new URLSearchParams({
        ...(state.searchText ? { searchText: state.searchText } : { }),
        ...(state.page ? { page: state.page } : {}),
        ...(state.gamesOnPage ? { gamesOnPage: state.gamesOnPage } : { gamesOnPage: '3' }),
    });
}

function paramsToState(params: URLSearchParams): HomeSearchState {
    return {
        searchText: params.get('searchText') ?? '',
        page: params.get('page') ?? '',
        gamesOnPage: params.get('gamesOnPage') ?? '3'
    };
}

export function Home() {
    const [queryParams, setQueryParams] = useSearchParams();
    const state = useMemo(() => paramsToState(queryParams), [queryParams]);

    const setSearch = useCallback((searchText: string) => {
        setQueryParams(stateToParams({
            ...state,
            searchText
        }));
    }, [state]);

    const setPage = useCallback((page: string) => {
        setQueryParams(stateToParams({
            ...state,
            page
        }));
    }, [state]);

    const { preferences, setPreferences } = useUserPreferences();

    const toggleGridMode = useCallback(() => {
        setPreferences({
            ...preferences,
            view: preferences.view === 'grid' ? 'list' : 'grid'
        });
    }, [preferences]);

    return (
        <main>
            
            <StoreNavigation setSearch={setSearch} />

            <article className={styles['welcome-info']}>
                <h2>Welcome to Steam</h2>

                <p>Steam provides ...</p>
                <button
                    className={styles['toggle-button']}
                    onClick={toggleGridMode}>
                    {preferences.view === 'grid' ? 'Show as list' : 'Show as grid'}
                </button>
            </article>

            <GameCards setPage={setPage} state={state} />
        </main>
    )
}