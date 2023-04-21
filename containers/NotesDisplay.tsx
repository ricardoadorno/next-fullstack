import ClipLoader from "react-spinners/ClipLoader";
import Card from "@/components/Card";
import useFetch from "@/utils/hooks/useFetch";
import { useDispatch } from "react-redux";
import type { CardType } from "@/utils/types";

export default function NotesDisplay() {
  const dispatch = useDispatch();

  const {
    data: notes,
    isLoading,
    error,
  } = useFetch("http://localhost:3000/api/getUserNotes");

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
        {notes?.map((note: CardType) => (
          <Card key={note._id} note={note} />
        ))}
        {notes && (
          <button
            onClick={() =>
              dispatch({
                type: "modal/openModal",
                payload: {
                  modalType: "modalCreate",
                  note: {
                    id: "",
                    title: "",
                    content: "",
                  },
                },
              })
            }
            className="new-note-button"
          >
            Add Note
          </button>
        )}
      </div>
    </main>
  );
}
