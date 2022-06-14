import { Box, Button, CircularProgress, Container, Link, Typography } from '@mui/material';
import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useAsync } from '../../hooks/use-async';
import { categoryService } from '../../services/category-service';
import { gameService } from '../../services/game-service';
import { Comments } from './comments';

const styles = {
    wrapper: {
        display: 'flex',
        flexDirection: 'column',
        marginTop: '20px'
    },
    container: {
        marginTop: '20px',
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        columnGap: '10px',
        width: '50%',
        border: '1px solid black',
        borderRadius: '3px',
        padding: '5px 10px',
        marginBottom: '20px'
    }
}

export function GameCardDetails() {
    const [showComments, setShowComments] = useState(false);

    const { id } = useParams();

    const { data: game, loading, error } = useAsync(
        () => gameService.loadGameById(Number(id)), [id]
    );

    const { data: categories } = useAsync(
        () => categoryService.getCategoriesByGameId(Number(id)), []
    );

    const toggleShowComments = () => {
        setShowComments(!showComments);
    }

    if (loading) {
        return (
            <Box sx={{ display: "flex", justifyContent: "center" }}>
                <CircularProgress />
            </Box>
        );
    }

    if (!game) {
        return <Typography variant="h4">No game with this id.</Typography>
    }

    return (
        <Container maxWidth="md" sx={{ textAlign: "center", marginTop: "30px" }}>
            <Typography variant="h4">
                Game details page
            </Typography>
            <Typography variant="h5">
                {game.name}
            </Typography>
            <Typography variant="body2">
                {game.description}
            </Typography>

            {categories && (
                <Container sx={styles.wrapper}>
                    <Typography variant='h5'>Categories</Typography>
                    <Container sx={styles.container}>
                        {categories.map(category => (
                            <Link component={RouterLink}
                                key={category.id}
                                to={`/categories/category/${category.category?.id}`}
                                variant='body1'
                            >
                                {category.category?.name}
                            </Link>
                        ))}
                    </Container>
                </Container>
            )}

            <Button variant='outlined' onClick={toggleShowComments}>
                {showComments ? 'Hide comments' : 'Show comments'}
            </Button>

            <Comments setShowComments={setShowComments} showComments={showComments} gameId={Number(id)} />

        </Container>
    )
}