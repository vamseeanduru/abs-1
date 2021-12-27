import React, { useState } from "react";
import "./Login.css";
import { axiosInstance } from "../../config";
import { useHistory } from "react-router-dom";

export default function Login({ setUsers }) {
  const history = useHistory();

  const [user, setUser] = useState({
    UserName: "",
    Password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const login = async (e) => {
    e.preventDefault();
    await axiosInstance
      .post("/Authentication/Set/Login", user)
      .then((res) => {
        setUsers(res.data.user);
        // history.push("/home");
      })
      .catch(function () {
        history.push("/");
      });
  };

  return (
    <div className="main">
      <form className="container1">
        <h1>Login</h1>
        <input
          type="text"
          name="UserName"
          value={user.UserName}
          onChange={handleChange}
          placeholder="Username"
        ></input>
        <input
          type="password"
          name="Password"
          value={user.Password}
          onChange={handleChange}
          placeholder="Password"
        ></input>
        <button className="button" onClick={login}>
          Login
        </button>
      </form>
    </div>
  );
}
