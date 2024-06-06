import { StarIcon } from "@chakra-ui/icons";
import { Dispatch, SetStateAction } from "react";

interface Props {
  hover: null | number;
  setHover: Dispatch<SetStateAction<number | null>>;
  rating: number;
  setRating: Dispatch<SetStateAction<number>>;
}

export const StarRating = ({ hover, rating, setHover, setRating }: Props) => {
  return (
    <>
      {[...Array(5)].map((_, i) => (
        <StarIcon
          w={6}
          h={6}
          key={i}
          border={
            hover && rating - 1 === i
              ? "1px solid red"
              : "1px solid transparent"
          }
          color={(hover || rating) > i ? "teal.500" : "gray.300"}
          onClick={() => setRating(i + 1)}
          onMouseEnter={() => setHover(i + 1)}
          onMouseLeave={() => setHover(null)}
        />
      ))}
    </>
  );
};
