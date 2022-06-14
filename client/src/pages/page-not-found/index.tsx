import { Container, Typography } from "@mui/material";

export function NotFound() {
    return (
        <Container>
            <Typography component='header'
                display='flex'
                flexDirection='column'
                alignItems='center'
                rowGap='10px'
                marginTop='20px'
            >
                <Typography component='h1' variant='h3' >
                    Page not found
                </Typography>
            </Typography>
            
        </Container>
    )
}