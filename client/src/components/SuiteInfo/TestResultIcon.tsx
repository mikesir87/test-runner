import CheckCircle from "@mui/icons-material/CheckCircle";
import HighlightOff from "@mui/icons-material/HighlightOff";
import { FC } from "react";
import { TestResultStatus } from "../RunnerContext";

type TestResultIconProps = {
  state: TestResultStatus;
};

export const TestResultIcon : FC<TestResultIconProps> = ({ state }) => {
  if (state === "passed") {
    return <CheckCircle color="success" />;
  }
  if (state === "failed") {
    return <HighlightOff color="error" />;
  }
  return null;
};