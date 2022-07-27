import { Button, Grid, Paper, Typography } from "@mui/material";
import { FC, useMemo } from "react";
import { Link } from "react-router-dom";
import { TestSuite, useRunnerContext } from "../RunnerContext"
import { SuiteActionButton } from "../SuiteInfo/SuiteActionButton";
import { SuiteIcon } from "../SuiteNavBar/SuiteIcon";

type SuiteCardProps = {
  suite: TestSuite;
};

export const SuiteCard : FC<SuiteCardProps> = ({ suite }) => {
  const { testRuns } = useRunnerContext();

  const testRun = useMemo(() => {
    if (!testRuns) return null;
    return testRuns.find(r => r.id === suite.id);
  }, [testRuns, suite.id]);

  if (!testRun) return null;

  return (
    <Paper elevation={2} sx={{marginBottom: "2em", padding: "1em"}}>
      <Grid container>
        <Grid item sm={7}>
          <Typography variant="h3" alignContent={"center"}>
            <SuiteIcon state={testRun.state} />&nbsp;
            { suite.title }
          </Typography>
          <Typography variant="subtitle1">{ suite.description }</Typography>
        </Grid>
        <Grid item sm={5} textAlign={"right"}>
          <SuiteActionButton suite={suite} testRun={testRun} />
          &nbsp;
          <Button component={Link} to={`/suites/${suite.id}`} variant="outlined">
            View Results
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
};