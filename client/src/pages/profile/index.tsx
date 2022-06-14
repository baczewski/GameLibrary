import { Container, Typography } from "@mui/material";
import { useCurrentUser } from "../../context/user-context";
import { UserComments } from "./user-comments";

const styles = {
  header: {
    textAlign: 'center',
    marginY: '20px'
  }
}

export function Profile() {
  const user = useCurrentUser();

  return (
    <Container>
      <Typography sx={styles.header} variant='h3'>
        Hello, {user?.username}
      </Typography>
      <UserComments />
    </Container>
  )
}