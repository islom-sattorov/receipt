import { useState } from "react";
import { API_KEY } from "../../shared/constants/api";
import { RecipesData } from "../../shared/types";

type RequesArg = RecipesData;

interface Props {
  onOpen?: () => void;
}

export const useEditReceipt = (props: Props) => {
  const [loading, setLoading] = useState(false);
  const [statusCode, setStatusCode] = useState<number | null>(null);

  const editReceipt = async (data: RequesArg) => {
    try {
      setLoading(true);
      const response = await fetch(`${API_KEY}/receipt/${data.id}`, {
        method: "PATCH",
        body: JSON.stringify({ ...data }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      setStatusCode(response.status);
      if (response.status > 199 && response.status < 300 && props.onOpen) {
        props.onOpen();
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return {
    editReceipt,
    loading,
    statusCode,
  };
};
