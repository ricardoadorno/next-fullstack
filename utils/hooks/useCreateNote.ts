import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useCreateNote(url: string, body: any) {
  const queryClient = useQueryClient();

  const { mutate, isLoading, error } = useMutation(
    async (body: { title: string; content: string }) => {
      return fetch(
        `http://localhost:3000/api/user/${"64395fb6f20788a36da4d5fe"}/create`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        }
      ).then((res) => res.json());
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["allNotes"]);
      },
    }
  );

  return { mutate, isLoading, error };
}
