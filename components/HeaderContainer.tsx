import { useState } from "react";

export default function HeaderContainer() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  function handleLogin(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const username = formData.get("username");
    const password = formData.get("password");

    fetch("http://localhost:3000/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setIsAuthenticated(true);
        }
      })
      .catch((err) => {
        console.log(err);
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
          <h3 className="header__title">Login</h3>
          <form className="header__form" onSubmit={handleLogin}>
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
              Login
            </button>
          </form>
          <div className="header__divider" />
          <button className="header__button" type="button">
            Register
          </button>
        </>
      )}
    </header>
  );
}
