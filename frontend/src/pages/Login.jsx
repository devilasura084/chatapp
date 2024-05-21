import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import react from "../assets/react.svg";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { loginRoute } from "../utils/APIRoutes";
function Login() {
  const navigate = useNavigate();
  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (handleValidation()) {
      const { username, password } = values;
      const { data } = await axios.post(loginRoute, {
        username,
        password,
      });
      if (data.status === false) {
        toast.error(data.msg, toastOptions);
      }
      if (data.status === true) {
        localStorage.setItem("chat-app-user", JSON.stringify(data.user));
        navigate("/");
      }
       
    }
  };
  const [values, setvalues] = useState({
    username: "",
    password: "",
  });
  const handleChange = (e) => {
    setvalues({ ...values, [e.target.name]: e.target.value });
  };
  const handleValidation = () => {
    const { username, password } = values;
    if (password.length === "") {
      toast.error("password is required", toastOptions);
      return false;
    } else if (username.length === "") {
      toast.error("Username is required", toastOptions);
      return false;
    }
    return true;
  };
  return (
    <>
      <div className="formcontainer">
        <form action="" onSubmit={(e) => handleSubmit(e)}>
          <div className="brand">
            <img src={react} alt="" />
          </div>
          <input
            type="text"
            placeholder="Username"
            name="username"
            onChange={(e) => handleChange(e)}
            min="3"
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            onChange={(e) => handleChange(e)}
          />
          <button type="submit">Login</button>
          <span>
            Don't have an accout?{" "}
            <Link className="a" to="/register">
              Register.
            </Link>
          </span>
        </form>
      </div>
      <ToastContainer />
    </>
  );
}

export default Login;
