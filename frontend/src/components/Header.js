import React from "react";
import { Link } from "react-router-dom";
import logo from "../images/logo.svg";

export const headerTypes = {
  signin: "signin",
  signup: "signup",
  logout: "logout",
};

export function Header({ type, userEmail }) {
  const headerLink = (type) => {
    switch (type) {
      case headerTypes.signin:
        return (
          <Link to="signup" className="header__link">
            Sign up
          </Link>
        );
      case headerTypes.signup:
        return (
          <Link to="signin" className="header__link">
            Log in
          </Link>
        );
      case headerTypes.logout:
        return (
          <>
            <ul className="header__links">
              <li className="header__email">{userEmail}</li>
              <li>
                <Link
                  to="signin"
                  className="header__link"
                  onClick={() => {
                    localStorage.removeItem("token");
                  }}
                >
                  Log out
                </Link>
              </li>
            </ul>
          </>
        );
      default:
        return null;
    }
  };
  return (
    <header className="header">
      <img className="header__logo" src={logo} alt="Around the U.S." />
      {headerLink(type)}
    </header>
  );
}
