import { React, useState } from "react";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const inputChangeHandler = (event) => {
    const value = event.target.value;
    const name = event.target.name;

    if (name === "username") {
      setUsername(value);
    }
    if (name === "email") {
      setEmail(value);
    }
    if (name === "password") {
      setPassword(value);
    }
  };

  const signUpHandler = (e) => {
    e.preventDefault();
    const postData = {
      username: username,
      email: email,
      password: password,
    };

    fetch("http://localhost:8080/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Registration successful!", data);
      })
      .catch((error) => {
        console.error("Error registering user:", error);
      });
  };

  return (
    <div className="w-[300px] m-auto mt-[200px]">
      <h1 className="text-center text-xl font-bold text-blue-600 m-2 text-3xl">
        Register
      </h1>
      <form className="register-form flex flex-col gap-4 border h-full border-black p-10 hover:bg-blue-100 cursor-pointer shadow-md shadow-blue-400">
        <input
          type="text"
          label="Username"
          placeholder="username"
          name="username"
          onChange={inputChangeHandler}
        />

        <input
          type="email"
          label="Email"
          placeholder="email"
          name="email"
          onChange={inputChangeHandler}
        />

        <input
          type="password"
          label="Password"
          placeholder="password"
          name="password"
          onChange={inputChangeHandler}
        />

        <button
          onClick={signUpHandler}
          className="border border-gray-400 hover:bg-blue-700 hover:text-white font-semibold rounded-xl py-1"
        >
          Sign up
        </button>
      </form>
    </div>
  );
};

export default Register;
