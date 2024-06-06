import {
  Box,
  Button,
  ButtonGroup,
  Flex,
  Input,
  Spinner,
} from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { RecipesList } from "../../shared/components/RecipesList/RecipesList";
import { useDebounce } from "../../utils/hooks/useDebounce";
import { useReceipt } from "../../utils/hooks/useReceipt";

export const Home = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [rating, setRating] = useState("");
  const [page, setPage] = useState(1);

  const debounceTitle = useDebounce(title, 550);
  const debouncePrice = useDebounce(price, 550);
  const debounceRating = useDebounce(rating, 550);

  const {
    data: recipes,
    loading,
    isNext,
  } = useReceipt({
    title: debounceTitle,
    price: debouncePrice,
    rating: debounceRating,
    page: page,
  });

  return (
    <>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        mt={8}
        px={4}
      >
        <ButtonGroup marginBottom={12}>
          {page !== 1 && (
            <Button onClick={() => setPage((prev) => prev - 1)}>
              Previous Page
            </Button>
          )}
          {isNext !== null && (
            <Button onClick={() => setPage((prev) => prev + 1)}>
              Next Page
            </Button>
          )}
        </ButtonGroup>
        <Flex
          direction={{ base: "column", md: "row" }}
          align="center"
          justify="center"
          gap={4}
          w="full"
          maxW="800px"
          mb={8}
        >
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Search for your best recipe in Anor Londo"
            variant="filled"
            size="lg"
          />
          <Input
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="Search by price"
            variant="filled"
            size="lg"
            type="number"
          />
          <Input
            value={rating}
            onChange={(e) => setRating(e.target.value)}
            placeholder="Search by rating"
            variant="filled"
            size="lg"
            type="number"
          />
          <Button
            onClick={() => navigate("/add")}
            colorScheme="teal"
            size="lg"
            minW={{ base: "full", md: "auto" }}
          >
            Add Recipe
          </Button>
        </Flex>
        {loading ? (
          <Spinner size="xl" color="teal.500" />
        ) : (
          <>
            <RecipesList data={recipes} loading={loading} />
            <ButtonGroup marginTop={12} marginBottom={12}>
              {page !== 1 && (
                <Button onClick={() => setPage((prev) => prev - 1)}>
                  Previous
                </Button>
              )}
              {isNext !== null && (
                <Button onClick={() => setPage((prev) => prev + 1)}>
                  Next
                </Button>
              )}
            </ButtonGroup>
          </>
        )}
      </Box>
    </>
  );
};
