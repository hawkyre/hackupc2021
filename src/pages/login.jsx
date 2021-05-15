import Head from "@components/Head";
import Cookies from "js-cookie";
import Router from "next/router";
import { useState } from "react";
import jwt from "jsonwebtoken";
import Signup from "@components/Signup";
import Signin from "@components/Signin";
import { getUnisListFromDB } from "@models/uni";

const Login = ({ uniList }) => {
  const [signupError, setSignupError] = useState("");
  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });
  const [registerForm, setRegisterForm] = useState({
    username: "",
    email: "",
    password: "",
    university: "",
  });

  const [mode, setMode] = useState("login");

  const signIn = (e) => {
    e.preventDefault();
    fetch("/api/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginForm),
    })
      .then((r) => r.json())
      .then((data) => {
        if (data && data.error) {
          setSignupError(data.message);
        }
        if (data && data.token) {
          jwt.verify(data.token, process.env.JWT_SECRET, (err, d) => {
            Cookies.set("hackupc-token", data.token, { expires: 20000 });
            Router.push("/");
          });
        }
      });
  };

  const signUp = (e) => {
    e.preventDefault();
    fetch("/api/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(registerForm),
    })
      .then((r) => r.json())
      .then((data) => {
        console.log(data);
        if (data && data.error) {
          setSignupError(data.message);
        }
        if (data && data.token) {
          jwt.verify(data.token, process.env.JWT_SECRET, (err, d) => {
            Cookies.set("hackupc-token", data.token, { expires: 20000 });
            Router.push("/");
          });
        }
      });
  };

  const handleRegisterChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setRegisterForm((p) => {
      return {
        ...p,
        [name]: value,
      };
    });
  };

  const handleLoginChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setLoginForm((p) => {
      return {
        ...p,
        [name]: value,
      };
    });
  };

  return (
    <div className="">
      <Head />
      <nav className="flex list-none justify-center mt-16 text-lg">
        <li>
          <button
            onClick={() => setMode("login")}
            className={`mr-8 ${
              mode === "login" ? "underline" : "text-gray-400"
            }`}
          >
            Iniciar sesión
          </button>
        </li>
        <li>
          <button
            onClick={() => setMode("register")}
            className={`${mode === "register" ? "underline" : "text-gray-400"}`}
          >
            Registrar
          </button>
        </li>
      </nav>
      <div>
        {mode === "login" ? (
          <Signin
            handleChange={handleLoginChange}
            loginForm={loginForm}
            signupError={signupError}
            signIn={signIn}
          />
        ) : (
          <Signup
            handleChange={handleRegisterChange}
            registerForm={registerForm}
            signupError={signupError}
            signUp={signUp}
            uniList={uniList}
          />
        )}
      </div>
    </div>
  );
};

export async function getServerSideProps() {
  const unis = await getUnisListFromDB();
  console.log(unis);
  if (!unis.success) {
    throw new Error("fuck");
    return;
  }

  return {
    props: {
      uniList: 8,
    },
  };
}

export default Login;