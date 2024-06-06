import { useEffect, useState } from "react";
import { API_KEY } from "../../shared/constants/api";
import { RecipesData } from "../../shared/types";
import { queryGenerator } from "../queryGenerator";

interface Props {
  title: string;
  price: string;
  rating: string;
  page: number;
}

export const useReceipt = ({ title, price, rating, page }: Props) => {
  const [data, setData] = useState<RecipesData[]>([]);
  const [loading, setLoading] = useState(false);
  const [isNext, setIsNext] = useState(false);

  useEffect(() => {
    const getReceipt = async () => {
      setLoading(true);
      try {
        const query = queryGenerator({
          _page: String(page),
          q: title,
          price,
          rating,
        });
        const response = await fetch(`${API_KEY}/receipt?${query}`);
        const dataJson = await response.json();
        setData(dataJson?.data);
        setIsNext(dataJson.next);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    getReceipt();
  }, [title, price, rating, page]);

  return { data, loading, isNext };
};
