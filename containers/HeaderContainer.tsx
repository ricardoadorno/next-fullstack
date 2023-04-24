import { useState } from "react";
import axios from "axios";

export default function HeaderContainer() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
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
        setIsAuthenticated(true);
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
        res.data;
        console.log(res.data);
        setIsAuthenticated(true);
      });
  }

  function handleLogout() {
    setIsAuthenticated(false);
  }

  return (
    <header className="header">
      {isAuthenticated ? (
        <>
          <h3 className="header__title">Heelo, Name!</h3>
          <button
            className="header__button"
            type="button"
            onClick={handleLogout}
          >
            Logout
          </button>
        </>
      ) : (
        <>
          <h3 className="header__title">{isRegister ? "Register" : "Login"}</h3>
          <form
            className="header__form"
            onSubmit={isRegister ? handleRegister : handleLogin}
          >
            <input
              className="header__input"
              type="text"
              name="username"
              placeholder="Username"
            />
            <input
              className="header__input"
              type="password"
              name="password"
              placeholder="Password"
            />
            <button className="header__button" type="submit">
              {isRegister ? "Register" : "Login"}
            </button>
          </form>
          <div className="header__divider" />
          <button
            className="header__button"
            type="button"
            onClick={() => setIsRegister(!isRegister)}
          >
            {isRegister ? "Login" : "Register"}
          </button>
        </>
      )}
    </header>
  );
}
