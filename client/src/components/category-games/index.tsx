import { CircularProgress, Container, Link, Typography } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useAsync } from "../../hooks/use-async";
import { categoryService } from "../../services/category-service";

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        rowGap: '10px',
        alignItems: 'center',
        marginTop: '20px'
    },
    header: {
        marginBottom: '20px'
    }
}

export function CategoryGames() {
    const { id } = useParams();

    const { data: games, loading, error } = useAsync(
        () => categoryService.getGamesByCategoryId(Number(id)), []
    );

    return (
        <Container component='div' sx={styles.container}>
            {error &&
                <Typography component='div'>
                    Invalid category id!
                </Typography>
            }

            {loading && <CircularProgress sx={{ textAlign: 'center' }} />}

            {games && (<Container sx={styles.container}>
                <Typography variant='h3' sx={styles.header}>Games</Typography>
                {games.map((game) => (
                    <Link component={RouterLink}
                        key={game.game?.id}
                        to={`/games/${game.game?.id}`}
                    >
                        {game.game?.name}
                    </Link>
                ))}
            </Container>)}
        </Container>
    )
}