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

type AuthState = {
  isAuth: boolean;
  user: {
    _id: string;
    username: string;
    password: string;
  };
  token: string;
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

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isAuth: false,
    user: {
      _id: "",
      username: "",
      password: "",
    },
    token: "",
  },
  reducers: {
    login(state, action) {
      state.isAuth = true;
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    logout(state) {
      state.isAuth = false;
      state.user = {
        _id: "",
        username: "",
        password: "",
      };
      state.token = "";
    },
  },
});

export const modalActions = modalSlice.actions;
export const authActions = authSlice.actions;

export const store = configureStore({
  reducer: {
    modal: modalSlice.reducer,
    auth: authSlice.reducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
