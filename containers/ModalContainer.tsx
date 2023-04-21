import * as Dialog from "@radix-ui/react-dialog";
import { FaTimes } from "react-icons/fa";
import { modalActions, RootState, AppDispatch } from "@/utils/store/store";
import { useDispatch, useSelector } from "react-redux";

export default function ModalContainer() {
  const dispatch = useDispatch<AppDispatch>();
  const modal = useSelector((state: RootState) => state.modal);

  function handleCreateNote(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const formData = new FormData(e.target as HTMLFormElement);

    const title = formData.get("title") as string;
    const content = formData.get("content") as string;

    fetch("http://localhost:3000/api/createUserNotes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, content }),
    });

    dispatch(modalActions.closeModal());
  }

  function handleDelete(id: string) {
    fetch("http://localhost:3000/api/deleteNote", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    });

    dispatch(modalActions.closeModal());
  }

  function handleEditNote(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const formData = new FormData(e.target as HTMLFormElement);

    const title = formData.get("title") as string;
    const content = formData.get("content") as string;

    fetch("http://localhost:3000/api/updateNote", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: modal.note.id, title, content }),
    });

    dispatch(modalActions.closeModal());
  }

  return (
    <>
      <Dialog.Root
        open={modal.isOpen}
        onOpenChange={(open) => {
          if (!open) dispatch(modalActions.closeModal());
        }}
      >
        <Dialog.Portal>
          <Dialog.Overlay className="dialog-overlay" />
          <Dialog.Content className="dialog__container">
            <Dialog.Title className="dialog__container-title">
              Edit profile
            </Dialog.Title>
            <Dialog.Description className="dialog__container-content">
              {modal.modalType === "modalDelete" ? (
                <>
                  <h2>Are you sure you want to delete this note?</h2>
                  <button
                    onClick={() => handleDelete(modal.note.id)}
                    className="modal-form-button"
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => dispatch(modalActions.closeModal())}
                    className="modal-form-button"
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <form
                  onSubmit={
                    modal.modalType === "modalCreate"
                      ? handleCreateNote
                      : handleEditNote
                  }
                >
                  <fieldset className="dialog__container-content-fieldset">
                    <label className="label" htmlFor="title">
                      Title
                    </label>
                    <input
                      className="input"
                      name="title"
                      defaultValue={modal.note.title}
                    />
                  </fieldset>
                  <fieldset className="dialog__container-content-fieldset">
                    <label className="label" htmlFor="content">
                      Content
                    </label>
                    <input
                      className="input"
                      name="content"
                      defaultValue={modal.note.content}
                    />
                  </fieldset>
                  <button className="modal-form-button" type="submit">
                    {modal.modalType === "modalCreate"
                      ? "Create Note"
                      : "Edit Note"}
                  </button>
                </form>
              )}
            </Dialog.Description>

            <Dialog.Close asChild>
              <button
                onClick={() => dispatch(modalActions.closeModal())}
                className="dialog__container-close-button"
                aria-label="Close"
              >
                <FaTimes />
              </button>
            </Dialog.Close>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </>
  );
}
