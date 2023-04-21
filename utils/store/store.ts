import { configureStore, createSlice } from "@reduxjs/toolkit";

type ModalState = {
  isOpen: boolean;
  modalType: "modalDelete" | "modalEdit" | "modalAdd";
  note: {
    id: string;
    title: string;
    content: string;
  };
};

const modalSlice = createSlice({
  name: "modal",
  initialState: {
    isOpen: false,
    modalType: "",
    note: {
      id: "",
      title: "",
      content: "",
    },
  },
  reducers: {
    openModal(state, action) {
      state.isOpen = true;
      state.modalType = action.payload.modalType;
      state.note = action.payload.note;
    },
    closeModal(state) {
      state.isOpen = false;
      state.modalType = "";
      state.note = {
        id: "",
        title: "",
        content: "",
      };
    },
  },
});

export const modalActions = modalSlice.actions;

export const store = configureStore({
  reducer: {
    modal: modalSlice.reducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
