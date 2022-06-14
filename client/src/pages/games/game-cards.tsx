import { Alert, Box, CircularProgress, Container, Pagination, Typography } from '@mui/material';
import { ChangeEvent } from 'react';
import { HomeSearchState } from '../home';
import { useUserPreferences } from '../../context/user-preferences';
import { useAsync } from '../../hooks/use-async';
import { gameService } from '../../services/game-service';
import { GameCard } from './game-card';

interface Props {
    state: HomeSearchState;
    setPage: (page: string) => void;
}

const styles = {
    container: {
        display: "grid",
        justifyContent: 'center',
        rowGap: '30px',
        marginBottom: '50px'
    },
    pagination: {
        textAlign: 'center',
        marginBottom: '50px'
    }
}

const gridStyle = {
    ...styles.container,
    gridTemplateColumns: "repeat(3, 1fr)",
    justifyItems: "center",
};

export function GameCards({ state, setPage }: Props) {
    const { data: games, loading, error } = useAsync(
        () => gameService.loadGames(state.searchText, state.page, state.gamesOnPage), [state]
    );

    const handleChange = (event: ChangeEvent<unknown>, value: number) => {
        setPage(String(value));
    }

    const { preferences } = useUserPreferences();

    return (
        <Container maxWidth="lg">
            {loading && (
                <Box sx={{ display: "flex", justifyContent: "center" }}>
                    <CircularProgress />
                </Box>
            )}

            {!!error && (
                <Box sx={{ display: "flex", justifyContent: "center" }}>
                    <Alert severity='error'>Could not load games</Alert>
                </Box>
            )}

            {games?.total !== 0 ?
                (<Box sx={preferences.view === 'grid' ? gridStyle : styles.container}>
                    {(games?.results ?? []).map((game) => (
                        <GameCard game={game} key={game.id} />
                    ))}</Box>) :
                (<Typography align='center'>No games</Typography>)}

            {games && (games.total > Number(state.gamesOnPage)) && (<Pagination
                sx={styles.pagination}
                size='large'
                count={Math.ceil(games.total / Number(state.gamesOnPage))}
                onChange={handleChange}
            />)}
        </Container>
    )
}