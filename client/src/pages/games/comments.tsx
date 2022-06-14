import { Box, Button, Container, TextField, Typography } from "@mui/material";
import { FormEvent, useMemo, useState } from "react";
import { useCurrentUser } from "../../context/user-context";
import { useAsync } from "../../hooks/use-async";
import { useAsyncAction } from "../../hooks/use-async-action";
import { commentService } from "../../services/comment-service";
import { HttpError } from "../../services/http-service";
import { Comment } from "./comment";

interface CommentsProps {
    gameId: number;
    showComments: boolean;
    setShowComments: (value: boolean) => void;
}

interface ValidationError {
    fieldErrors: Record<string, string[]>;
    formErrors: string[];
}

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        rowGap: '15px',
        width: '50%',
        margin: '10px auto 50px auto'
    },
    comments: {
        display: 'flex',
        flexDirection: 'column',
        rowGap: '20px',
        marginBottom: '50px'
    },
    comment: {
        marginBottom: '15px'
    }
}

export function Comments({ gameId, showComments, setShowComments }: CommentsProps) {
    const [comment, setComment] = useState('');
    const [rating, setRating] = useState('');

    const { trigger, error } = useAsyncAction(async (event: FormEvent) => {
        event.preventDefault();

        await commentService.addComment({ comment, rating: Number(rating) }, gameId);

        !showComments && setShowComments(!showComments);

        reload();
    })

    const { data: comments, reload }
        = useAsync(() => commentService.getCommentsByGameId(gameId), []);

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
        <Container>
            <Typography variant='h3'>Comments</Typography>
            <Container component='form' onSubmit={trigger} sx={styles.container}>
                <TextField
                    placeholder='Add a comment'
                    value={comment}
                    error={!!validationError?.fieldErrors['comment']}
					helperText={validationError?.fieldErrors['comment']?.join(', ')}
                    onChange={e => setComment(e.target.value)}
                />

                <TextField
                    placeholder='Add a rating'
                    value={rating}
                    error={!!validationError?.fieldErrors['rating']}
					helperText={validationError?.fieldErrors['rating']?.join(', ')}
                    onChange={e => setRating(e.target.value)}
                />

                <Button type='submit' variant='outlined'>
                    Add comment
                </Button>
            </Container>

            {comments?.length === 0 &&
                <Typography>
                    There are not any comments
                </Typography>}

            {showComments && (<Container sx={styles.comments}>
                {(comments ?? []).map(comment => (
                    <Comment reload={reload} key={comment.id} comment={comment} />
                ))}
            </Container>)}
        </Container>
    )
}