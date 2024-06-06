import { Box, Heading } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { ArrowBack } from "../../shared/icons/ArrowBack";

export const Navigation = () => {
  const navigate = useNavigate();
  return (
    <Box
      display={"flex"}
      alignItems={"center"}
      justifyContent={"center"}
      cursor={"pointer"}
      marginTop={2}
      position={"fixed"}
      left={"10px"}
      onClick={() => navigate(-1)}
    >
      <ArrowBack />
      <Heading as={"h4"} size={"md"} color={"#1E90FF"}>
        Previous
      </Heading>
    </Box>
  );
};
