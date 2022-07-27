import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { FC, useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { TestSuite, useRunnerContext } from "../RunnerContext";
import { SuiteIcon } from "./SuiteIcon";

type NavBarItemProps = {
  selected: boolean;
  suite: TestSuite;
}

export const NavBarItem : FC<NavBarItemProps> = ({ selected, suite }) => {
  const { testRuns } = useRunnerContext();
  const suiteTest = useMemo(() => {
    if (!testRuns) return null;
    return testRuns.find(r => r.id === suite.id);
  }, [testRuns, suite.id]);

  const navigate = useNavigate();
  const navigateToSuite = useCallback(() => {
    navigate(`/suites/${suite.id}`);
  }, [suite.id, navigate]);

  return (
    <ListItemButton selected={selected} onClick={navigateToSuite}>
      <ListItemIcon>
        <SuiteIcon state={suiteTest?.state} /> &nbsp;
      </ListItemIcon>
      <ListItemText primary={suite.title} />
    </ListItemButton>
  );
}