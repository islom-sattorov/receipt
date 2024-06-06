import { CloseIcon } from "@chakra-ui/icons";
import {
  Box,
  Input,
  InputGroup,
  InputRightElement,
  Text,
} from "@chakra-ui/react";
import { Dispatch, SetStateAction } from "react";

interface Props<T> {
  value: T;
  setValue: Dispatch<SetStateAction<T>>;
  error: string;
  placeholder: string;
  handleInputFocus: () => void;
  handleInputBlur: () => void;
  handleInputReset: () => void;
  type: string;
}

export function CustomInput<T>({
  value,
  setValue,
  error,
  handleInputFocus,
  handleInputBlur,
  handleInputReset,
  placeholder,
  type,
}: Props<T>) {
  return (
    <Box>
      <InputGroup>
        <Input
          type={type}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          isInvalid={Boolean(error)}
          errorBorderColor="red.300"
          placeholder={placeholder}
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
        />
        {Boolean(value) && (
          <InputRightElement cursor={"pointer"} onClick={handleInputReset}>
            <CloseIcon />
          </InputRightElement>
        )}
      </InputGroup>
      {Boolean(error) && <Text color={"red.300"}>{error}</Text>}
    </Box>
  );
}
