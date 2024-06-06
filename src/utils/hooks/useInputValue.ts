import { useState } from "react";
import { REQUIRED_ERROR } from "../../shared/constants/errors";

interface Props<T> {
  initialValue: T;
}

export const useInputValue = <T>(props: Props<T>) => {
  const [value, setValue] = useState(props.initialValue);
  const [error, setError] = useState("");

  const handleInputReset = () => {
    setValue(props.initialValue);
    setError("");
  };

  const handleInputFocus = () => {
    setError("");
  };

  const handleInputBlur = () => {
    if (value) return;
    setError(REQUIRED_ERROR);
  };

  return {
    value,
    setValue,
    error,
    setError,
    handleInputReset,
    handleInputBlur,
    handleInputFocus,
  };
};
