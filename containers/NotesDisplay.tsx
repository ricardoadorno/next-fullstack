import ClipLoader from "react-spinners/ClipLoader";
import Card from "@/components/Card";
import useFetch from "@/utils/hooks/useFetch";
import { useDispatch } from "react-redux";
import type { CardType } from "@/utils/types";
import { useAutoAnimate } from "@formkit/auto-animate/react";

const baseUrl = undefined;

// import { useSelector } from "react-redux";
// import { RootState } from "@/utils/store/store";

export default function NotesDisplay() {
  const dispatch = useDispatch();
  // const auth = useSelector((state: RootState) => state.auth);

  const {
    data: notes,
    isLoading,
    error,
  } = useFetch("/api/user/64395fb6f20788a36da4d5fe");

  const [autoAnimate] = useAutoAnimate();

  if (error) {
    return <h1>Something went wrong</h1>;
  }
  return (
    <main>
      {/* <h2 className="title">Leaver a Note:</h2> */}
      <div className="cards-container">
        <ClipLoader
          color="orange"
          loading={isLoading}
          size={50}
          aria-label="Loading Spinner"
        />
        <div ref={autoAnimate}>
          {notes?.map((note: CardType) => (
            <Card key={note._id} note={note} />
          ))}
        </div>
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
