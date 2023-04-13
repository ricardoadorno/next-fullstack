import { useState } from "react";

export default function Header() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <header className="header">
      {isAuthenticated ? (
        <>
          <h3 className="header__title">Heelo, Name!</h3>
          <button className="header__button" type="button">
            Logout
          </button>
        </>
      ) : (
        <>
          <h3 className="header__title">Login</h3>
          <form className="header__form">
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
          <button className="header__button" type="button">
            Register
          </button>
        </>
      )}
    </header>
  );
}
