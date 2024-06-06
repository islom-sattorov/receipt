import { useEffect, useState } from "react";
import { API_KEY } from "../../shared/constants/api";
import { RecipesData } from "../../shared/types";
import { queryGenerator } from "../queryGenerator";

interface Props {
  id: number;
}

export const useReceiptById = ({ id }: Props) => {
  const [data, setData] = useState<RecipesData>();
  const [loading, setLoading] = useState<boolean>(false);
  const [prefetch, setPrefetch] = useState(true);

  const prefetchRequest = () => {
    setPrefetch(true);
  };

  useEffect(() => {
    if (id === 0) return;
    const getReceiptById = async () => {
      try {
        setLoading(true);
        const query = queryGenerator({ id });
        const response = await fetch(`${API_KEY}/receipt?${query}`);
        const dataJson = await response.json();
        setData(dataJson[0]);
        return dataJson[0];
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
        setPrefetch(false);
      }
    };
    if (prefetch) {
      getReceiptById();
    }
  }, [id, prefetch]);

  return { data, loading, prefetchRequest };
};
