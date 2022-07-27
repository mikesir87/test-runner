import Button from "@mui/material/Button";
import { FC } from "react";
import { TestRun, TestSuite, useRunnerContext } from "../RunnerContext";

type SuiteActionButtonProps = {
  suite: TestSuite;
  testRun: TestRun;
}

export const SuiteActionButton : FC<SuiteActionButtonProps> = ({ suite, testRun }) => {
  const { runTests } = useRunnerContext();
  const { state } = testRun;

  if (state === "running") {
    return (
      <Button variant="contained" disabled>
        Tests running...
      </Button>
    )
  }

  return (
    <Button variant="contained" onClick={() => runTests(suite.id)}>
      Run Tests
    </Button>
  )
};