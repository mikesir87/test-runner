import AppBar from "@mui/material/AppBar";
import Container from "@mui/material/Container";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

export const Header = () => {
  return (
    <AppBar position="static">
      <Container maxWidth="md">
        <Toolbar disableGutters>
          <Typography variant="h5">
            Test Runner
          </Typography>
        </Toolbar>
      </Container>
    </AppBar>
  );
};