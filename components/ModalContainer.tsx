import Modal from "react-modal";
import { FaTimes } from "react-icons/fa";
import { modalActions, RootState, AppDispatch } from "@/store/store";
import { useDispatch, useSelector } from "react-redux";

export default function ModalContainer() {
  const dispatch = useDispatch<AppDispatch>();
  const modal = useSelector((state: RootState) => state.modal);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (modal.modalType === "modalCreate") {
      // dispatch(createNote)
    } else {
      // dispatch(editNote)
    }
  }

  return (
    <>
      <Modal
        isOpen={modal.isOpen}
        onRequestClose={() => dispatch(modalActions.closeModal())}
        contentLabel="Example Modal"
        className="modal"
      >
        <h2>My Modal</h2>
        <button
          className="modal-close-button"
          onClick={() => dispatch(modalActions.closeModal())}
        >
          <FaTimes />
        </button>
        <form className="modal-form" onSubmit={handleSubmit}>
          <label htmlFor="title">Title</label>
          <input className="modal-form-input" type="text" name="title">
            {modal.note.title}
          </input>
          <label htmlFor="body">Body</label>
          <textarea className="modal-form-input" name="body">
            {modal.note.content}
          </textarea>

          <button className="modal-form-button" type="submit">
            {modal.modalType === "modalCreate" ? "Create Note" : "Edit Note"}
          </button>
        </form>
      </Modal>
    </>
  );
}
