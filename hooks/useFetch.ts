import { useQuery } from "@tanstack/react-query";

export default function useFetch(url: string) {
  const { data, isLoading, error } = useQuery({
    queryKey: ["folders"],
    queryFn: () => fetch(url).then((res) => res.json()),
  });

  return { data, isLoading, error };
}
