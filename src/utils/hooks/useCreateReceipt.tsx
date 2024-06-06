import { useState } from "react";
import { API_KEY } from "../../shared/constants/api";
import { RecipesData } from "../../shared/types";

type RequesArg = Omit<RecipesData, "id">;

interface Props {
  onOpen: () => void;
}

export const useCreateReceipt = ({ onOpen }: Props) => {
  const [loading, setLoading] = useState(false);
  const [statusCode, setStatusCode] = useState<number | null>(null);

  const createReceipt = async (data: RequesArg) => {
    try {
      setLoading(true);
      const response = await fetch(`${API_KEY}/receipt`, {
        method: "POST",
        body: JSON.stringify({ ...data }),
      });
      await response.json();
      setStatusCode(response.status);
      if (response.status > 199 && response.status < 300) {
        onOpen();
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return {
    createReceipt,
    loading,
    statusCode,
  };
};
