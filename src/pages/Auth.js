import React, { useContext, useState } from "react";
import { Col, Row } from "react-bootstrap";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import { Link, useNavigate } from "react-router-dom";
import { loginApi, registerApi } from "../services/allApis";
import { Bounce, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { tokenAuthContext } from "../services/AuthContext";

function Auth({ register }) {

  const {isAutherised,setIsAutherised}=useContext(tokenAuthContext)

  const navigate = useNavigate();

  // state to store form inputs
  const [userInputs, setUserInputs] = useState({
    username: "",
    email: "",
    password: "",
  });

  // state to check validation
  const [validUsername, setValidUsername] = useState(false);
  const [validEmail, setValidEmail] = useState(false);
  const [validPassword, setValidPassword] = useState(false);

  const setData = (e) => {
    const { name, value } = e.target;

    // username validation
    if (name === "username") {
      if (value.match(/^[a-zA-Z ]+$/)) {
        setValidUsername(false);
      } else {
        setValidUsername(true);
      }
    }

    // email validation
    if (name === "email") {
      if (value.match(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/)) {
        setValidEmail(false);
      } else {
        setValidEmail(true);
      }
    }

    // password validation
    if (name === "password") {
      if (value.match(/^[a-zA-Z0-9]+$/)) {
        setValidPassword(false);
      } else {
        setValidPassword(true);
      }
    }

    setUserInputs({ ...userInputs, [name]: value });
  };

  // handle register
  const handleRegister = async (e) => {
    e.preventDefault();
    const { username, email, password } = userInputs;
    if (!username || !email || !password) {
      toast.error("Please fill all fields", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        theme: "dark",
        transition: Bounce,
      });
    } else {
      const result = await registerApi(userInputs);
      if (result.status >= 200 && result.status <= 300) {
        toast.success(result.data, {
          position: "top-right",
          autoClose: 5000,
          theme: "dark",
          transition: Bounce,
        });
        setUserInputs({ username: "", email: "", password: "" });
        navigate("/authentication");
      } else {
        toast.error(result.response.data, {
          position: "top-right",
          autoClose: 5000,
          theme: "dark",
          transition: Bounce,
        });
        setUserInputs({ username: "", email: "", password: "" });
      }
    }
  };

  // handle login
  const handleLogin = async (e) => {
    e.preventDefault();
    const { email, password } = userInputs;
    if (!email || !password) {
      toast.error("Please fill all fields", {
        position: "top-right",
        autoClose: 5000,
        theme: "dark",
        transition: Bounce,
      });
    } else {
      const result = await loginApi(userInputs);
      if (result.status === 200) {
        sessionStorage.setItem("currentUser", result.data.user.username);
        sessionStorage.setItem("userId", result.data.user._id);
        sessionStorage.setItem("token", result.data.token);
        sessionStorage.setItem("user", JSON.stringify(result.data.user));

        


        setIsAutherised(true)

        toast.success(result.data.message, {
          position: "top-right",
          autoClose: 5000,
          theme: "dark",
          transition: Bounce,
        });
        setUserInputs({ username: "", email: "", password: "" });
        navigate("/");
      } else {
        toast.error(result.response.data, {
          position: "top-right",
          autoClose: 5000,
          theme: "dark",
          transition: Bounce,
        });
        setUserInputs({ username: "", email: "", password: "" });
      }
    }
  };

  return (
    <div className="my-5">
      <p className="container w-100 w-md-75">
        <Link style={{ textDecoration: "none" }} to={"/"}>
          <i className="fa-solid fa-backward fa-beat-fade"></i> Back To Home
        </Link>
      </p>

      <div className="container w-100 w-md-75 border rounded shadow-lg">
        <Row className="g-0">
          <Col md={6}>
            {register ? (
              <img
                className="img-fluid mt-5"
                src="https://i.postimg.cc/MpGyqqWY/1721037472793.png"
                alt="Sign Up"
              />
            ) : (
              <img
                className="img-fluid mt-5"
                src="https://i.postimg.cc/SNnRGGdW/4578955-tester-l-application-smartphone-et-la-developper-gratuit-vectoriel.jpg"
                alt="Sign In"
              />
            )}
          </Col>

          <Col md={6} className="p-5 border-start">
            <div className="text-center">
              <h1 className="my-3">{register ? "Sign Up Here" : "Sign In Here"}</h1>
            </div>

            {register && (
              <FloatingLabel
                controlId="floatingUserName"
                label="Username"
                className="mb-3"
              >
                <Form.Control
                  name="username"
                  onChange={setData}
                  value={userInputs.username}
                  type="text"
                  placeholder="Username"
                />
                {validUsername && (
                  <p className="text-danger fs-6 text-start my-3">
                    Please include alphabets and spaces only.
                  </p>
                )}
              </FloatingLabel>
            )}

            <FloatingLabel controlId="floatingInput" label="Email address" className="mb-3">
              <Form.Control
                name="email"
                onChange={setData}
                value={userInputs.email}
                type="email"
                placeholder="name@example.com"
              />
              {validEmail && (
                <p className="text-danger fs-6 text-start my-3">
                  Please provide a valid email.
                </p>
              )}
            </FloatingLabel>

            <FloatingLabel controlId="floatingPassword" label="Password">
              <Form.Control
                name="password"
                onChange={setData}
                value={userInputs.password}
                type="password"
                placeholder="Password"
              />
              {validPassword && (
                <p className="text-danger fs-6 text-start my-3">
                  Please include alphabets and numbers only.
                </p>
              )}
            </FloatingLabel>

            <div className="text-center">
              {register ? (
                <button onClick={handleRegister} className="btn btn-light py-3 px-5 my-5 shadow-lg btn-style text-white">
                  Register
                </button>
              ) : (
                <button onClick={handleLogin} className="btn btn-light py-3 px-5 my-5 shadow-lg btn-style text-white">
                  Login
                </button>
              )}
              {register ? (
                <p>
                  Already have an account?{" "}
                  <Link to={"/authentication"} style={{ textDecoration: "none" }}>
                    Login
                  </Link>
                </p>
              ) : (
                <p>
                  New User?{" "}
                  <Link to={"/register"} style={{ textDecoration: "none" }}>
                    Sign up First
                  </Link>
                </p>
              )}
            </div>
          </Col>
        </Row>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Auth;
