import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import Box from "@mui/system/Box";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { FC, useMemo } from "react";
import { TestRun } from "../RunnerContext"
import { TestResultIcon } from "./TestResultIcon";

type TestDisplayProps = {
  testRun: TestRun;
};

export const TestDisplay : FC<TestDisplayProps> = ({ testRun }) => {
  const flattenedTests = useMemo(() => {
    if (!testRun.results) return null;

    return testRun.results
      .flatMap(r => r.assertionResults);
  }, [testRun]);

  if (!testRun.results) return null;

  return (
    <Box>
      { flattenedTests?.map((test, index) => (
        <Accordion key={test.fullName}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls={`test-${index}-content`}
            id={`test-${index}-header`}
          >
            <TestResultIcon state={test.status} />&nbsp;&nbsp;
            <Typography>{ test.fullName }</Typography>
            &nbsp;&nbsp;
            <Typography>
              <em>({ ( test.duration / 1000 ).toFixed(1) } seconds)</em>
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            { test.failureMessages && test.failureMessages.length > 0 ? (
              <pre style={{ overflow: "scroll" }}>{ test.failureMessages.join("") }</pre>
            ) : (
              <em>There's no output to display for this test</em>
            )}
          </AccordionDetails>
        </Accordion>
      ))}
    </Box>
  );
}