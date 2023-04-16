import { FaEdit, FaTrash } from "react-icons/fa";

export type CardType = {
  title: string;
  body: string;
};

export default function Card({ title, body }: CardType) {
  return (
    <div className="card">
      <div className="card__title">{title}</div>
      <div className="card__body">{body}</div>
      <div className="group-button">
        <FaTrash />
        <FaEdit />
      </div>
    </div>
  );
}
