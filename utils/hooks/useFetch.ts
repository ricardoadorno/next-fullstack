import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export default function useFetch(url: string) {
  const { data, isLoading, error } = useQuery({
    queryKey: ["allNotes"],
    queryFn: () => axios.get(url).then((res) => res.data),
  });

  return { data, isLoading, error };
}
