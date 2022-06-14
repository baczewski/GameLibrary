import { Container } from "@mui/material";
import { useCurrentUser } from "../../context/user-context";
import { useAsync } from "../../hooks/use-async";
import { commentService } from "../../services/comment-service";
import { Comment } from "../games/comment";

const styles = {
  comments: {
    marginY: '30px',
    display: 'flex',
    flexDirection: 'column',
    rowGap: '20px',
    width: '80%'
  }
}

export function UserComments() {
  const user = useCurrentUser();

  const { data, reload } =
    useAsync(() => commentService.getCommentsByUserId(user?.id as number), []);

  return (
    <Container>
      {data && (<Container sx={styles.comments}>
        {data.map((comment) => (
          <Comment reload={reload} key={comment.id} comment={comment} />
        ))}
      </Container>)}
    </Container>
  )
}