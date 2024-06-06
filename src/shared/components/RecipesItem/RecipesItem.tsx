import { StarIcon } from "@chakra-ui/icons";
import { Badge, Box, Image } from "@chakra-ui/react";
import { RecipesData } from "../../types";

interface Props extends RecipesData {}

export const RecipesItem = (props: Props) => {
  return (
    <Box
      cursor={"pointer"}
      maxW="md"
      borderWidth={"1px"}
      borderRadius={"lg"}
      overflow={"hiddens"}
    >
      <Box padding={2}>
        <Image
          src={props.imageUrl ?? "https://bit.ly/2Z4KKcF"}
          alt={props.imageAlt ?? "Rear view of modern home with pool"}
          borderRadius="full"
          boxSize="250px"
          loading="eager"
        />
      </Box>

      <Box p="6">
        <Box display="flex" alignItems="baseline">
          <Badge borderRadius="full" px="2" colorScheme="teal">
            New
          </Badge>
          <Box
            color="gray.500"
            fontWeight="semibold"
            letterSpacing="wide"
            fontSize="xs"
            textTransform="uppercase"
            ml="2"
          >
            {props.cookingTime} cooking time
          </Box>
        </Box>

        <Box
          mt="1"
          fontWeight="semibold"
          as="h4"
          lineHeight="tight"
          noOfLines={1}
        >
          {props.title}
        </Box>

        <Box>
          {props.price}
          <Box as="span" color="gray.600" fontSize="sm">
            / souls
          </Box>
        </Box>

        <Box display="flex" mt="2" alignItems="center">
          {Array(5)
            .fill("")
            .map((_, i) => (
              <StarIcon
                key={i}
                color={i < props.rating ? "teal.500" : "gray.300"}
              />
            ))}
          <Box as="span" ml="2" color="gray.600" fontSize="sm">
            {props.rating} reviews
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
