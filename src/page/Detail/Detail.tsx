import {
  Box,
  Button,
  Grid,
  GridItem,
  Heading,
  HStack,
  Image,
  Spinner,
  Text,
  Textarea,
  VStack,
} from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useEditReceipt } from "../../utils/hooks/useEditReceipt";
import { useReceiptById } from "../../utils/hooks/useReceiptById";

export const Detail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { data, loading, prefetchRequest } = useReceiptById({
    id: Number(id ?? 0),
  });
  const [comment, setComment] = useState("");

  const { editReceipt, loading: editLoading } = useEditReceipt();

  const handleNewComment = () => {
    if (!data) return;
    let reqData;
    if (data?.comments) {
      reqData = {
        ...data,
        comments: [...data.comments, { id: id ?? "1", text: comment }],
      };
    } else {
      reqData = {
        ...data,
        comments: [{ id: id ?? "1", text: comment }],
      };
    }
    editReceipt(reqData);
    prefetchRequest();
    setComment("");
  };

  return (
    <Box p={8}>
      {loading ? (
        <Spinner />
      ) : (
        <Grid
          h={"auto"}
          templateRows={"repeat(2, 1fr)"}
          templateColumns={"repeat(2,1fr)"}
          gap={8}
        >
          <GridItem rowSpan={3} colSpan={1}>
            <Image
              borderRadius={"lg"}
              boxSize={"400px"}
              objectFit={"cover"}
              src={data?.imageUrl}
              alt={data?.imageAlt}
            />
          </GridItem>
          <GridItem colSpan={1}>
            <Heading mb={4} size="xl">
              {data?.title}
            </Heading>
            <Text fontSize="lg" color="gray.500" mb={4}>
              {data?.subtitle}
            </Text>
            <HStack spacing={4} mb={4}>
              <Text fontSize="xl" fontWeight="bold">
                {data?.price} souls
              </Text>
              <Text fontSize="xl" fontWeight="bold" color="yellow.400">
                {data?.rating} ★
              </Text>
            </HStack>
            <Text fontSize="md" color="gray.600" mb={8}>
              Cooking Time: {data?.cookingTime}
            </Text>
            <Button colorScheme="teal" onClick={() => navigate(`/edit/${id}`)}>
              Edit
            </Button>
          </GridItem>

          <GridItem colSpan={2}>
            <Heading mb={4} size="lg">
              Comments
            </Heading>
            <VStack spacing={4} align="stretch">
              {data?.comments?.length ? (
                data.comments.map((comment) => (
                  <Box
                    key={comment.id}
                    p={4}
                    bg="gray.100"
                    borderRadius="md"
                    boxShadow="md"
                  >
                    <Text color={"red.300"}>{comment.text}</Text>
                  </Box>
                ))
              ) : (
                <Text>No comments yet. Be the first to comment!</Text>
              )}
            </VStack>

            <Textarea
              mt={4}
              placeholder="Add a comment..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              // isDisabled={submitting}
            />
            <Button
              mt={4}
              colorScheme="teal"
              onClick={handleNewComment}
              isLoading={editLoading}
            >
              Submit
            </Button>
          </GridItem>
        </Grid>
      )}
    </Box>
  );
};
