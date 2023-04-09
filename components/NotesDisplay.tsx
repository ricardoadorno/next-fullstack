import { useState } from "react";
import Modal from "react-modal";

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
      <h3>Display All</h3>
      <div>
        {cardList.map((card) => (
          <div key={card.id}>
            <h4>{card.title}</h4>
            <div>{card.body}</div>
            <div>Created At: {card.createdAt}</div>
            <div>
              <button onClick={handleEditNote}>Edit</button>
              <button onClick={handleDeleteNote}>Delete</button>
            </div>
          </div>
        ))}
      </div>
      <button onClick={handleCreateNote}>Add</button>

      <button onClick={openModal}>Open Modal</button>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Example Modal"
      >
        <h2>Hello</h2>
        <button onClick={closeModal}>close</button>
        <div>I am a modal</div>
        <form>
          <input />
          <button>tab navigation</button>
          <button>stays</button>
          <button>inside</button>
          <button>the modal</button>
        </form>
      </Modal>
    </main>
  );
}
