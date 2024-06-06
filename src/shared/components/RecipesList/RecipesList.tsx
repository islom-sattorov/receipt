import { Box, Spinner } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { RecipesData } from "../../types";
import { RecipesItem } from "../RecipesItem/RecipesItem";

interface Props {
  data: RecipesData[];
  loading: boolean;
}

export const RecipesList = ({ data, loading }: Props) => {
  const navigate = useNavigate();

  if (loading) {
    return (
      <Box
        key={"container"}
        maxWidth={1920}
        display={"flex"}
        gap={"12px"}
        flexWrap={"wrap"}
        alignItems={"center"}
        justifyContent={"center"}
      >
        <Spinner />
      </Box>
    );
  }
  return (
    <Box
      key={"container"}
      maxWidth={1920}
      display={"flex"}
      gap={"12px"}
      flexWrap={"wrap"}
      alignItems={"center"}
      justifyContent={"center"}
    >
      {data?.map((item, idx) => (
        <div key={idx} onClick={() => navigate(`/detail/${item.id}`)}>
          <RecipesItem {...item} />
        </div>
      ))}
    </Box>
  );
};
