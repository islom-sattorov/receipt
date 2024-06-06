import { Button, Container, Heading, useColorMode } from "@chakra-ui/react";

export const Header = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <header>
      <Container
        display="flex"
        justifyContent={"space-between"}
        alignItems={"center"}
        padding={4}
        maxW="1920"
        bg="#1E90FF"
        color="#FFFFFF"
      >
        <Heading as={"h2"} size={"md"}>
          Strange recipes
        </Heading>
        <Button onClick={() => toggleColorMode()}>
          {colorMode.toUpperCase()}
        </Button>
      </Container>
    </header>
  );
};
