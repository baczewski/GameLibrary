import { Button, Container, Divider, Typography } from "@mui/material";
import { useCurrentUser } from "../../context/user-context";
import { useAsyncAction } from "../../hooks/use-async-action";
import { CommentModel, commentService } from "../../services/comment-service";

interface CommentProps {
    comment: CommentModel;
    reload: () => void;
}

const styles = {
    container: {
        padding: '12px 20px',
        boxShadow: '10',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        borderRadius: '5px',
        border: '2px solid'
    },
    creator: {
        textAlign: 'right'
    },
    divider: {
        marginY: '10px'
    },
    button: {
        background: 'linear-gradient(120deg, rgb(128, 130, 130) 0%, #434546 100%)',
        width: '23%',
        margin: '0 auto',
        // border: '1px solid '
    }
}

function chooseBackground(comment: CommentModel) {
    if (comment.rating >= 0 && comment.rating <= 4) {
        return '#E56B1F';
    } else if (comment.rating > 4 && comment.rating <= 7) {
        return '#FCC133';
    }

    return '#3EB650';
}

export function Comment({ comment, reload }: CommentProps) {
    const user = useCurrentUser();

    const { trigger, error, loading } = useAsyncAction(async () => {
        await commentService.deleteComment(comment.id);

        reload();
    });

    return (
        <Container sx={[styles.container, { borderColor: chooseBackground(comment) }]}>
            <Typography variant='h5'>
                {comment.comment}
            </Typography>
            <Divider sx={styles.divider} />
            <Typography sx={styles.creator}>
                Commented by: {comment.author?.username}
            </Typography>
            {comment.author?.id === user?.id && (
                <Button
                    sx={styles.button}
                    variant='outlined'
                    onClick={trigger}>
                    Delete comment</Button>
            )}
        </Container>
    )
}