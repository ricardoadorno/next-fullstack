import Header from "@/components/Header";
import NotesDisplay from "@/components/NotesDisplay";
import AsideMenu from "@/components/AsideMenu";
import useFetch from "@/hooks/useFetch";

export default function Home() {
  const { data, isLoading, error } = useFetch(
    "http://jsonplaceholder.typicode.com/todos/1"
  );

  return (
    <>
      <AsideMenu />

      <Header />

      <NotesDisplay />
    </>
  );
}
