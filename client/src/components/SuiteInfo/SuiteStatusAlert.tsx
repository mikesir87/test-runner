import Alert from "@mui/material/Alert";
import { FC } from "react";
import { TestRun } from "../RunnerContext";

type SuiteStatusAlertProps = {
  testRun: TestRun;
};

export const SuiteStatusAlert : FC<SuiteStatusAlertProps> = ({ testRun }) => {
  if (testRun.state === "success") {
    return <Alert severity="success" sx={{marginBottom: "2em"}}>Hooray! All tests have passed!</Alert>
  }

  if (testRun.state === "failure") {
    return <Alert severity="error" sx={{marginBottom: "2em"}}>Ah shucks! It looks like one or more tests are failing!</Alert>
  }

  if (testRun.state === "error") {
    return <Alert severity="warning" sx={{marginBottom: "2em"}}>Hmm... something prevented the tests from running. You might need to check the logs.</Alert>
  }

  if (testRun.state === "running") {
    return <Alert severity="info" sx={{marginBottom: "2em"}}>The tests are running right now... hang tight!</Alert>
  }

  return null;
}