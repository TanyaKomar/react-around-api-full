import React from "react";
import { Link } from "react-router-dom";

function Register({ email, setEmail, password, setPassword, handleRegisterSubmit }) {
  return (
    <>
      <div className="signin">
        <p className="signin__title">Sign up</p>
        <form className="signin__form" onSubmit={handleRegisterSubmit}>
          <input
            className="signin__input"
            id="email"
            name="email"
            type="email"
            placeholder="Email"
            required
            value={email || ""}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className="signin__input"
            id="password"
            name="password"
            type="password"
            placeholder="Password"
            required
            value={password || ""}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="signin__button" type="submit">
            Sign up
          </button>
        </form>
        <div className="signin__message">
          <p>Already a member?</p>
          <Link to="signin" className="signin__link">
            Log in here!
          </Link>
        </div>
      </div>
    </>
  );
}

export default Register;
