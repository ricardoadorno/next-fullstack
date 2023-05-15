import { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { RootState } from "@/utils/store/store";
import { useDispatch } from "react-redux";

export default function HeaderContainer() {
  const dispatch = useDispatch();

  const auth = useSelector((state: RootState) => state.auth);

  const [isRegister, setIsRegister] = useState(false);

  function handleRegister(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const username = formData.get("username");
    const password = formData.get("password");

    axios
      .post("http://localhost:3000/api/user/create", {
        username,
        password,
      })
      .then((res) => {
        res.data;
        console.log(res.data);
        // dispatch({ type: "SET_AUTH", payload: true });
      });
  }

  function handleLogin(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const username = formData.get("username");
    const password = formData.get("password");

    axios
      .post("http://localhost:3000/api/auth/login", {
        username,
        password,
      })
      .then((res) => {
        dispatch({
          type: "auth/login",
          payload: {
            isAuth: true,
            user: res.data.user,
            token: res.data.token,
          },
        });
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user", JSON.stringify(res.data.user));
      });
  }

  function handleLogout() {
    dispatch({
      type: "auth/logout",
      payload: {
        isAuth: false,
        token: "",
      },
    });
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  }

  return (
    <>
      {auth.isAuth ? (
        <header className="header">
          <h3 className="header__title">Hello, {auth.user.username}!</h3>
          <button className="btn" type="button" onClick={handleLogout}>
            Logout
          </button>
        </header>
      ) : (
        <header className="header">
          <h3 className="header__title">{isRegister ? "Register" : "Login"}</h3>

          <form
            className="header__form"
            onSubmit={isRegister ? handleRegister : handleLogin}
          >
            <input
              className="input-text"
              type="text"
              name="username"
              placeholder="Username"
            />
            <input
              className=" input-text"
              type="password"
              name="password"
              placeholder="Password"
            />
            <button className="btn" type="submit">
              {isRegister ? "Register" : "Login"}
            </button>
          </form>

          <div className="header__divider" />

          <button
            className="btn btn-secondary"
            type="button"
            onClick={() => setIsRegister(!isRegister)}
          >
            {isRegister ? "Login" : "Register"}
          </button>
        </header>
      )}
    </>
  );
}
