import axios, { AxiosError, AxiosResponse } from "axios";
import { useCallback, useState } from "react";

export function useQuery<T>({ url }: { url: string }) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const query = useCallback(() => {
    function handleFulfilled(res: AxiosResponse) {
      setData(res.data);
    }

    function handleError(err: AxiosError) {
      setError(err.message);
    }

    function handleFinally() {
      setLoading(false);
    }

    function beforeRequest() {
      setLoading(true);
      setError(null);
    }

    beforeRequest();
    axios
      .get(url)
      .then(handleFulfilled)
      .catch(handleError)
      .finally(handleFinally);
  }, [url]);

  return { query, data, loading, error };
}
