import { GameProps } from '../../components/game-interface';
import { Button, Card, CardActions, CardContent, CardMedia, Link, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

export function GameCard({ game }: GameProps) {
    return (
        <Card sx={{
            width: 345, height: "400px",
            display: "grid", gridTemplateRows: "4fr 1fr 1fr",
            background: 'rgba(211, 211, 211, 0.99)'
        }}>
            <CardMedia
                sx={{ objectFit: 'fill' }}
                component="img"
                height="100%"
                image={game.imageUrl ? game.imageUrl : "/images/login_background.jpg"}
                alt="Game image"
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div" color='black'>
                    {game.name}
                </Typography>
                <Typography variant="body2" color='black'>
                    {game.description?.slice(0, 40)}...
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="large">Like</Button>
                <Link component={RouterLink} to={`/games/${game.id}`} variant='body1'>
                    Details
                </Link>
            </CardActions>
        </Card>
    )
}