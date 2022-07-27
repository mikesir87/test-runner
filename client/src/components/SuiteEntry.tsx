import Button from "@mui/material/Button";
import { FC, useCallback, useMemo } from "react";
import { TestSuite, useRunnerContext } from "./RunnerContext";

type SuiteEntryProps = {
  suite: TestSuite,
}

export const SuiteEntry: FC<SuiteEntryProps> = ({ suite }) => {
  const {testRuns} = useRunnerContext();

  const runTests = useCallback(() => {
    fetch("/api/runs", {
      method: "POST",
      body: JSON.stringify({ suiteId: suite.id }),
      headers: { "Content-type": "application/json" },
    }).then(r => r.json())
    .then(console.log);
  }, [suite.id]);

  const testRun = useMemo(() => {
    if (!testRuns) return null;
    return testRuns.find(r => r.id === suite.id)
  }, [testRuns, suite.id]);

  return (
    <>
      { suite.title }
      &nbsp;
      <Button variant="contained" size="small" onClick={() => runTests()}>
        Run
      </Button>
      { testRun && (
        <>
          { testRun.state === "running" && "Running..." }
        </>
      )}
    </>
  );
}