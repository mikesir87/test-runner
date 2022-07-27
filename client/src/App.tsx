import { DockerMuiThemeProvider } from '@docker/docker-mui-theme';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Header } from './components/Header';
import { MainView } from './components/MainView';
import { NotFoundRoute } from './components/NotFoundRoute';
import { RunnerContextProvider } from './components/RunnerContext';

function App() {
  return (
    <BrowserRouter>
      <DockerMuiThemeProvider>
        <CssBaseline />

        <Header />

        <RunnerContextProvider>
          <Grid container justifyContent="center" columns={{ xs: 4, md: 12, lg: 12 }}>
            <Grid item xs={12} md={10} lg={8}>
              <Routes>
                <Route index element={<MainView />} />
                <Route path="/suites/:suiteId" element={<MainView />} />
                <Route path="*" element={<NotFoundRoute />} />
              </Routes>
            </Grid>
          </Grid>
        </RunnerContextProvider>
      </DockerMuiThemeProvider>
    </BrowserRouter>
  );
}

export default App;
