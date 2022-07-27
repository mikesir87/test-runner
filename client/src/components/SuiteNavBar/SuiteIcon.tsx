import { FC } from "react";
import { TestSuiteState } from "../RunnerContext";
import AutorenewIcon from '@mui/icons-material/Autorenew';
import CheckCircle from "@mui/icons-material/CheckCircle";
import Help from "@mui/icons-material/Help";
import HighlightOff from "@mui/icons-material/HighlightOff";
import ReportProblem from "@mui/icons-material/ReportProblem";

type SuiteIconProps = {
  state: TestSuiteState | undefined;
}

export const SuiteIcon : FC<SuiteIconProps> = ({ state }) => {
  if (!state) return null;

  if (state === "running") {
    return (
      <AutorenewIcon 
        color="primary" 
        sx={{
          animation: "spin 2s linear infinite",
          "@keyframes spin": {
            "0%": {
              transform: "rotate(0deg)",
            },
            "100%": {
              transform: "rotate(360deg)",
            },
          },
        }}
      />
    );
  }

  if (state === "error") {
    return <ReportProblem color="error" />;
  }

  if (state === "failure") {
    return <HighlightOff color="error" />;
  }

  if (state === "success") {
    return <CheckCircle color="success" />;
  }

  if (state === "unknown") {
    return <Help color="disabled" />;
  }
  
  return null;
};