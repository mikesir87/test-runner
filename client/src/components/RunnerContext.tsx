import { createContext, useContext, FC, ReactNode, useState, useEffect, useCallback } from "react";
import ReconnectingWebSocket from "reconnecting-websocket";

export type TestSuite = {
  id: string;
  title: string;
  description: string;
}

export type TestSuiteState = "unknown" | "success" | "failure" | "error" | "running";

export type TestRun = {
  id: string;
  state: TestSuiteState;
  results: TestResult[]
}

export type TestResultStatus = "passed" | "failed";

type TestResult = {
  message: string;
  naem: string;
  startTime: number;
  endTime: number;
  status: string;
  summary: string;
  assertionResults: AssertionResult[];
};

type AssertionResult = {
  ancestorTitles: string[];
  duration: number;
  failureMessages: string[];
  fullName: string;
  location: string;
  status: TestResultStatus;
  title: string;
}

type RunnerContext = {
  testSuites: null | TestSuite[],
  testRuns: null | TestRun[],
  runTests: (suiteId: string) => void;
};

const DEFAULT_CONTEXT: RunnerContext = {
  testSuites: null,
  testRuns: null,
  runTests: () => {},
};

const RunnerContextContext = createContext<RunnerContext>(DEFAULT_CONTEXT);

type Props = {
  children: ReactNode,
};

export const RunnerContextProvider: FC<Props> = ({ children }) => {
  const [testSuites, setTestSuites] = useState<null | TestSuite[]>(null);
  const [testRuns, setTestRuns] = useState<null | TestRun[]>(null);

  useEffect(() => {
    fetch("/api/suites")
      .then(r => r.json())
      .then((suites) => setTestSuites(suites));
  }, []);

  useEffect(() => {
    fetch("/api/runs")
      .then(r => r.json())
      .then((runs) => setTestRuns(runs));
  }, []);

  useEffect(() => {
    const rws = new ReconnectingWebSocket("ws://localhost:3000/api/events");
    rws.addEventListener("message", (event) => {
      const data = JSON.parse(event.data);
      console.log("WS DATA", data);

      if (data.type === "runs")
        setTestRuns(data.runs);
    });
    return () => rws.close();
  }, []);

  const runTests = useCallback((suiteId: string) => {
    fetch(`/api/runs`, {
      method: "POST",
      body: JSON.stringify({ suiteId }),
      headers: { "Content-type": "application/json" },
    });
  }, []);

  return (
    <RunnerContextContext.Provider value={{ testSuites, testRuns, runTests, }}>
      { children }
    </RunnerContextContext.Provider>
  )
};

export const useRunnerContext = () => useContext(RunnerContextContext);