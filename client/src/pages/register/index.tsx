import { Container, TextField, Button, Typography, Alert } from '@mui/material';
import { FormEvent, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAsyncAction } from '../../hooks/use-async-action';
import { authService } from '../../services/auth-service';
import { HttpError } from '../../services/http-service';
import { DuplicateUsernameError, userService } from '../../services/user-service';

const styles = {
    container: {
        display: 'grid',
        gap: '12px',
        marginTop: '50px',
        boxShadow: '20',
        padding: '30px 0 50px',
        borderRadius: '3px'
    },
    button: {
        width: '50%',
        margin: '5px auto 0 auto',
        height: '50px'
    }
}

interface ValidationError {
    fieldErrors: Record<string, string[]>;
    formErrors: string[];
}

export function Register() {
    const [passwordsError, setPasswordsError] = useState<string | undefined>(undefined);

    const [input, setInput] = useState({
        username: '',
        age: '',
        password: '',
        repeatPassword: ''
    });

    const navigate = useNavigate();

    const { trigger, loading, error } = useAsyncAction(async (event: FormEvent) => {
        event.preventDefault();

        if (input.password !== input.repeatPassword) {
            setPasswordsError('Passwords do not match!');
            return;
        }

        await userService.createUser({
            name: input.username,
            age: Number(input.age),
            password: input.password
        });

        await authService.login(input.username, input.password);
        navigate('/games');
    });

    const validationError = useMemo(() => {
        if (!error) {
            return undefined;
        }

        if (error instanceof HttpError && error.body.fieldErrors) {
            return error.body as ValidationError;
        }

        return undefined;
    }, [error]);

    return (
        <Container
            maxWidth='xs'
            component='form'
            onSubmit={trigger}
            sx={styles.container}
        >
            <Typography variant='h3' align='center' marginBottom='20px' >
                Register
            </Typography>

            <TextField
                label='Username'
                variant='filled'
                value={input.username}
                error={!!validationError?.fieldErrors['name']}
                helperText={validationError?.fieldErrors['name']?.join(', ')}
                onChange={e => setInput({ ...input, username: e.target.value })}
            />

            <TextField
                label='Age'
                variant='filled'
                type='number'
                value={input.age}
                error={!!validationError?.fieldErrors['age']}
                helperText={validationError?.fieldErrors['age']?.join(', ')}
                onChange={e => setInput({ ...input, age: e.target.value })}
            />

            <TextField
                label='Password'
                type='password'
                variant='filled'
                value={input.password}
                error={!!validationError?.fieldErrors['password']}
                helperText={validationError?.fieldErrors['password']?.join(', ')}
                onChange={e => setInput({ ...input, password: e.target.value })}
            />

            <TextField
                label='Repeat password'
                type='password'
                variant='filled'
                value={input.repeatPassword}
                error={!!passwordsError}
                helperText={passwordsError}
                onChange={e => setInput({ ...input, repeatPassword: e.target.value })}
            />

            <Button sx={styles.button} variant='outlined' size='large' type='submit'>
                Register
            </Button>
        </Container>
    )
}