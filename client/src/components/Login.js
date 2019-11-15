import React, { useState } from "react";
import axiosWithAuth from "../utils/axiosWithAuth";

const Login = props => {
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [credentials, setCredentials] = useState({
    username: "",
    password: ""
  });

  const login = e => {
    e.preventDefault();
    axiosWithAuth()
      .post("/api/login", credentials)
      .then(response => {
        console.log("respone", response);
        localStorage.setItem("token", response.data.payload);
        props.history.push("/protected");
        setLoggedIn(true);
      })
      .catch(err => console.log("error", err));
  };

  const handleChange = e => {
    console.log("handleChange working");
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value
    });
  };
  return (
    <>
      <h2 className="loginTitle">Login to the bubble app!</h2> <br />
      <form onSubmit={login}>
        <label>
          Username:{" "}
          <input
            type="username"
            value={credentials.username}
            name="username"
            onChange={handleChange}
          />
        </label>{" "}
        <br />
        <label>
          Password:
          <input
            type="password"
            value={credentials.password}
            name="password"
            onChange={handleChange}
          />
        </label>{" "}
        <br />
        <button onSubmit={login}>Login!</button>
      </form>
    </>
  );
};

export default Login;
