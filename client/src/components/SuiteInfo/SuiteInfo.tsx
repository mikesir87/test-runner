import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { FC, useMemo } from "react";
import { useRunnerContext } from "../RunnerContext";
import { SuiteActionButton } from "./SuiteActionButton";
import { SuiteStatusAlert } from "./SuiteStatusAlert";
import { TestDisplay } from "./TestDisplay";

type SuiteInfoProps = {
  suiteId: string;
}

export const SuiteInfo : FC<SuiteInfoProps> = ({ suiteId }) => {
  const { testSuites, testRuns } = useRunnerContext();
  const suite = useMemo(() => {
    if (!testSuites) return;
    return testSuites.find(s => s.id === suiteId);
  }, [testSuites, suiteId]);

  const testRun = useMemo(() => {
    if (!testRuns) return;
    return testRuns.find(r => r.id === suiteId);
  }, [suiteId, testRuns]);

  const minStartTime = useMemo(() => {
    if (!testRun || !testRun.results) return -1;
    return testRun.results.map(r => r.startTime)
      .sort()
      [0];
  }, [testRun]);

  const maxEndTime = useMemo(() => {
    if (!testRun || !testRun.results) return -1;
    return testRun.results.map(r => r.endTime)
      .sort().reverse()
      [0];
  }, [testRun]);

  if (!suite || !testRun) return null;

  return (
    <Box>
      <Grid container spacing={2} marginBottom={2}>
        <Grid item sm={8}>
          <Typography variant="h2">{ suite.title }</Typography>
          <Typography variant="subtitle1">{ suite.description }</Typography>
          { (minStartTime && maxEndTime && minStartTime !== maxEndTime) ? (
            <Typography variant="body1">Last test run took { ((maxEndTime - minStartTime) / 1000).toFixed(1) } seconds</Typography>
          ) : (
            <Typography variant="body1"><em>This suite has not been run yet</em></Typography>
          )}
        </Grid>
        <Grid item sm={4} textAlign="right">
          <SuiteActionButton suite={suite} testRun={testRun} />
        </Grid>
      </Grid>

      <Divider sx={{ marginBottom: "2em" }} />

      <SuiteStatusAlert testRun={testRun} />

      <TestDisplay testRun={testRun} />
    </Box>
  )
}