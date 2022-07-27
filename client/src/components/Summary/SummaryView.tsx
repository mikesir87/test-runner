import Box from "@mui/system/Box";
import { useRunnerContext } from "../RunnerContext";
import { SuiteCard } from "./SuiteCard";

export const SummaryView = () => {
  const { testSuites } = useRunnerContext();

  if (!testSuites) return null;

  return (
    <Box>
      { testSuites.map(suite => (
        <SuiteCard suite={suite} key={suite.id} />
      ))}
    </Box>
  );
};