import { FaEdit, FaTrash } from "react-icons/fa";
import type { CardType } from "@/utils/types";
import { useDispatch } from "react-redux";

export default function Card({ note }: { note: CardType }) {
  const dispatch = useDispatch();

  return (
    <div className="card">
      <div className="card__title">{note.title}</div>
      <div className="card__content">{note.content}</div>
      <div className="group-button">
        <FaTrash
          onClick={() => {
            dispatch({
              type: "modal/openModal",
              payload: {
                modalType: "modalDelete",
                note: {
                  id: note._id,
                  title: "",
                  content: "",
                },
              },
            });
          }}
        />
        <FaEdit
          onClick={() => {
            dispatch({
              type: "modal/openModal",
              payload: {
                modalType: "modalEdit",
                note: {
                  id: note._id,
                  title: note.title,
                  content: note.content,
                },
              },
            });
          }}
        />
      </div>
    </div>
  );
}
