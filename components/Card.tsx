import { FaEdit, FaTrash } from "react-icons/fa";

export type CardType = {
  title: string;
  body: string;
};

export default function Card() {
  return (
    <div className="card">
      <div className="card__title">Card Title</div>
      <div className="card__body">
        Card Body. Lorem ipsum dolor sit amet consectetur adipisicing elit.
        Quae, similique dignissimos. Quia, optio omnis. Fugit reprehenderit
        facilis ea voluptas voluptatem?
      </div>
      <div className="group-button">
        <FaTrash />
        <FaEdit />
      </div>
    </div>
  );
}
