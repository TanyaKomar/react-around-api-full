import React from "react";
import { Link } from "react-router-dom";

function Login({ email, setEmail, password, setPassword, handleLoginSubmit }) {
  return (
    <>
      <div className="signin">
        <p className="signin__title">Log in</p>
        <form className="signin__form" onSubmit={handleLoginSubmit}>
          <input
            className="signin__input"
            id="email"
            name="email"
            type="email"
            placeholder="Email"
            value={email || ""}
            required
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className="signin__input"
            id="password"
            name="password"
            type="password"
            placeholder="Password"
            value={password || ""}
            required
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="signin__button" type="submit">
            Log in
          </button>
        </form>
        <div className="signin__message">
          <p>Not a member yet?</p>
          <Link to="signup" className="signin__link">
            Sign up here!
          </Link>
        </div>
      </div>
    </>
  );
}

export default Login;
