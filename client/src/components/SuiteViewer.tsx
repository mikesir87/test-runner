import { useRunnerContext } from "./RunnerContext";
import { SuiteEntry } from "./SuiteEntry";

export const SuiteViewer = () => {
  const { testSuites } = useRunnerContext();

  if (!testSuites)
    return <p>Loading...</p>;

  return (
    <ul>
      { testSuites.map(suite => (
        <li key={suite.id}>
          <SuiteEntry suite={suite} />
        </li>
      ))}
    </ul>
  );
};
