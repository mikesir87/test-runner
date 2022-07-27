import { List } from "@mui/material";
import { FC } from "react";
import { useRunnerContext } from "../RunnerContext";
import { NavBarItem } from "./NavBarItem";

type SuiteNavBarProps = {
  selectedSuiteId: string | undefined;
};

export const SuiteNavBar : FC<SuiteNavBarProps> = ({ selectedSuiteId }) => {
  const { testSuites } = useRunnerContext();
  
  if (!testSuites)
    return null;

  return (
    <List component="nav">
      { testSuites.map(suite => (
        <NavBarItem 
          key={suite.id} 
          suite={suite}
          selected={suite.id === selectedSuiteId} 
        />
      ))}
    </List>
  );
};