import { useState } from "react";
import Modal from "react-modal";
import { useQuery } from "@tanstack/react-query";
import ClipLoader from "react-spinners/ClipLoader";
import Card from "./Card";
import { FaTimes } from "react-icons/fa";

// MODAL ADD
// MODAL EDIT

// CARD List State - Current Type

// SORTABLE

export default function NotesDisplay() {
  const [cardList, setCardList] = useState([
    {
      id: 1,
      title: "Card 1",
      body: "Card 1 Body",
      createdAt: "2021-08-01",
    },
  ]);

  // const {
  //   data: todos,
  //   isLoading,
  //   error,
  // } = useQuery({
  //   queryKey: ["todos"],
  //   queryFn: async () => {
  //     const res = await fetch("https://jsonplaceholder.typicode.com/todos");
  //     return res.json();
  //   },
  // });

  function handleCreateNote() {}

  function handleDeleteNote() {}

  function handleEditNote() {}

  const [modalIsOpen, setIsOpen] = useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <main>
      <h2 className="title">Your Notes:</h2>
      <div className="cards-container">
        <Card />
        <Card />
        <Card />
        <Card />
        {/* {cardList.map((card) => (
          <div key={card.id}>
            <h4>{card.title}</h4>
            <div>{card.body}</div>
            <div>Created At: {card.createdAt}</div>
            <div>
              <button onClick={handleEditNote}>Edit</button>
              <button onClick={handleDeleteNote}>Delete</button>
            </div>
          </div>
        ))} */}
        <button className="new-note-button" onClick={openModal}>
          Add +
        </button>
      </div>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Example Modal"
        className="modal"
      >
        <h2>Hello</h2>
        <button className="modal-close-button" onClick={closeModal}>
          <FaTimes />
        </button>
        <form className="modal-form">
          <label htmlFor="title">Title</label>
          <input className="modal-form-input" type="text" name="title" />
          <label htmlFor="body">Body</label>
          <textarea className="modal-form-input" name="body" />
          <button className="modal-form-button" type="submit">
            Create Note
          </button>
        </form>
      </Modal>

      {/* <ClipLoader
        color="red"
        loading={isLoading}
        size={50}
        aria-label="Loading Spinner"
      /> */}

      {/* {todos &&
        todos.map((todo) => (
          <div key={todo.id}>
            <h4>{todo.title}</h4>
            <p>{todo.completed ? "Completed" : "Not Completed"}</p>
          </div>
        ))} */}
    </main>
  );
}
