import ClipLoader from "react-spinners/ClipLoader";
import Card from "./Card";
import useFetch from "@/hooks/useFetch";
import { useDispatch } from "react-redux";
import { modalActions } from "@/store/store";

export default function NotesDisplay() {
  const dispatch = useDispatch();

  const {
    data: notes,
    isLoading,
    error,
  } = useFetch(
    "http://localhost:3000/api/getUserNotes"
    // "https://jsonplaceholder.typicode.com/posts"
  );

  function handleCreateNote() {}

  function handleDeleteNote() {}

  function handleEditNote() {}

  if (error) {
    return <h1>Something went wrong</h1>;
  }
  return (
    <main>
      <h2 className="title">Your Notes:</h2>
      <div className="cards-container">
        <ClipLoader
          color="orange"
          loading={isLoading}
          size={50}
          aria-label="Loading Spinner"
        />
        {notes?.map((note: any) => (
          <Card key={note.id} title={note.title} body={note.content} />
        ))}
        {notes && (
          <button
            // onClick={() =>
            //   dispatch(modalActions.openModal()) as unknown as () => void
            // }
            className="new-note-button"
          >
            Add Note
          </button>
        )}
      </div>
    </main>
  );
}
