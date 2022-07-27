import Home from "@mui/icons-material/Home";
import Grid from "@mui/material/Grid";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import { useNavigate, useParams } from "react-router-dom";
import { SuiteInfo } from "./SuiteInfo/SuiteInfo";
import { SuiteNavBar } from "./SuiteNavBar/SuiteNavBar";
import { SummaryView } from "./Summary/SummaryView";

export const MainView = () => {
  const navigate = useNavigate();
  const { suiteId } = useParams();

  return (
    <Grid container spacing={3} marginTop={3}>
      <Grid item sm={3}>
        <List component="nav" sx={{ marginBottom: "1em" }}>
          <ListItemButton selected={!suiteId} onClick={() => navigate("/")}>
            <ListItemIcon>
              <Home />
            </ListItemIcon>
            <ListItemText primary="Summary" />
          </ListItemButton>
        </List>

        <Typography variant="h3" marginBottom={1}>Test Suites</Typography>
        
        <SuiteNavBar selectedSuiteId={suiteId} />
      </Grid>
      <Grid item sm={9}>
        { suiteId ? (
          <SuiteInfo suiteId={suiteId} />
        ) : (
          <SummaryView />
        )}
      </Grid>
    </Grid>
  )
};