import * as Dialog from "@radix-ui/react-dialog";
import { FaTimes } from "react-icons/fa";
import { modalActions, RootState, AppDispatch } from "@/utils/store/store";
import { useDispatch, useSelector } from "react-redux";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export default function ModalContainer() {
  const dispatch = useDispatch<AppDispatch>();
  const modal = useSelector((state: RootState) => state.modal);
  // const auth = useSelector((state: RootState) => state.auth);

  const queryClient = useQueryClient();
  const { mutate: createNoteMutation } = useMutation(
    async (body: { title: string; content: string }) => {
      return axios
        .post(`/api/user/64395fb6f20788a36da4d5fe/create`, body)
        .then((res) => res.data);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["allNotes"]);
      },
    }
  );
  const { mutate: deleteNoteMutation } = useMutation(
    async (id: string) => {
      return axios.delete(`/api/notes/${id}/delete`).then((res) => res.data);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["allNotes"]);
      },
    }
  );
  const { mutate: editNoteMutation } = useMutation(
    async (body: { id: string; title: string; content: string }) => {
      return axios
        .put(`/api/notes/${body.id}/update`, body)
        .then((res) => res.data);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["allNotes"]);
      },
    }
  );

  function handleCreateNote(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const formData = new FormData(e.target as HTMLFormElement);
    const title = formData.get("title") as string;
    const content = formData.get("content") as string;

    createNoteMutation({ title, content });

    dispatch(modalActions.closeModal());
  }

  function handleDelete(id: string) {
    deleteNoteMutation(id);

    dispatch(modalActions.closeModal());
  }

  function handleEditNote(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const formData = new FormData(e.target as HTMLFormElement);
    const title = formData.get("title") as string;
    const content = formData.get("content") as string;

    editNoteMutation({ id: modal.note.id, title, content });

    dispatch(modalActions.closeModal());
  }

  return (
    <Dialog.Root
      open={modal.isOpen}
      onOpenChange={(open) => {
        if (!open) dispatch(modalActions.closeModal());
      }}
    >
      <Dialog.Portal>
        <Dialog.Overlay className="dialog-overlay" />
        <Dialog.Content className="dialog__container">
          <Dialog.Title className="title">
            {modal.modalType === "modalCreate" ? "Create Note" : "Edit Note"}
          </Dialog.Title>
          <Dialog.Description className="dialog__container-content">
            {modal.modalType === "modalDelete" ? (
              <>
                <h2>Are you sure you want to delete this note?</h2>
                <div className="group-btn">
                  <button
                    onClick={() => handleDelete(modal.note.id)}
                    className="btn "
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => dispatch(modalActions.closeModal())}
                    className="btn"
                  >
                    Cancel
                  </button>
                </div>
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
                    className="input-text"
                    name="title"
                    defaultValue={modal.note.title}
                  />
                </fieldset>
                <fieldset className="dialog__container-content-fieldset">
                  <label className="label" htmlFor="content">
                    Content
                  </label>
                  <textarea
                    className="input-text"
                    name="content"
                    defaultValue={modal.note.content}
                    rows={7}
                  />
                </fieldset>
                <button className="btn" type="submit">
                  {modal.modalType === "modalCreate" ? "Create" : "Edit"}
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
  );
}
