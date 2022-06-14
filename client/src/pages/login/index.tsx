import { Alert, Button, CircularProgress, Container, TextField, Typography } from '@mui/material';
import { FormEvent, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAsyncAction } from '../../hooks/use-async-action';
import { authService, InvalidCredentialsError } from '../../services/auth-service';

const styles = {
    container: {
        display: 'grid',
        padding: '40px 0 150px 0',
        maxHeight: '450px',
        borderRadius: '3px',
        boxShadow: 20,
        marginTop: '50px',
        gap: '20px',
    },
    button: {
        paddingY: '15px',
        width: '50%',
        marginX: 'auto',
        maxHeight: '50px'
    }
}

export function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const location = useLocation();
    const navigate = useNavigate();

    const { trigger, data, loading, error } = useAsyncAction(async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        await authService.login(username, password);

        const currentLocation = location.state as { location: string } | null;
        const pathName = currentLocation?.location;
        navigate(pathName ?? '/');
    });

    const errorMessage = useMemo(() => {
        if (!error) {
            return undefined;
        }

        if (error instanceof InvalidCredentialsError) {
            return 'Invalid username or password';
        }

        return 'Something went wrong';
    }, [error]);

    return (
        <Container
            maxWidth='xs'
            component='form'
            onSubmit={trigger}
            sx={styles.container}
        >
            <Typography variant='h3' align='center' marginBottom='20px' >
                Login
            </Typography>

            <TextField
                label='Username'
                variant='filled'
                value={username}
                onChange={e => setUsername(e.target.value)}
            />

            <TextField
                label='Password'
                type='password'
                variant='filled'
                value={password}
                onChange={e => setPassword(e.target.value)}
            />

            <Button
                variant='outlined'
                type='submit'
                disabled={loading}
                sx={styles.button}
            >
                {loading ?
                    <CircularProgress /> :
                    <>Submit</>}
            </Button>

            {!!error && <Alert variant='filled' severity='error'>{errorMessage}</Alert>}

        </Container>

    )
}