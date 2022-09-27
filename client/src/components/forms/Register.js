import React from "react";
import { Link } from "react-router-dom";
import { BsPersonPlus } from "react-icons/bs";
import { useState } from "react";
import InputTextField from "../common/InputFileds/inputText";

const Register = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const handleRegister = () => {
    console.log(email, password);
    setEmail("");
    setPassword("");
  };

  return (
    <div className="mt-20 flex items-center justify-center ">
      <div class="md:max-w-md rounded overflow-hidden shadow-lg p-4 border  border-gray ">
        <div className="flex items-center justify-center space-x-2 mt-2 text-center font-bold text-2xl">
          <BsPersonPlus size={25} />
          <h1 className="">Register</h1>
        </div>
        <div className="mt-2 space-y-6 p-4">
          <form className="space-y-6">
            <input
              type="text"
              name="name"
              value={email}
              placeholder="Name"
              className="w-full outline-none p-2 border-gray border focus-none"
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="email"
              name="email"
              value={email}
              placeholder="Email"
              className="w-full outline-none p-2 border-gray border focus-none"
              onChange={(e) => setEmail(e.target.value)}
            />

            <InputTextField
              type="text"
              name="password"
              value={password}
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <InputTextField
              type="password"
              name="confirmPassword"
              value={password}
              placeholder="Confirm Password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className="flex items-center space-x-2">
              <input
                type="radio"
                name="user"
                value="user"
                checked={true}
                className="text-xl h-6 w-5 accent-brightRed"
              />{" "}
              <lable>Regular User</lable>
              <input
                type="radio"
                name="provider"
                value="provider"
                className="text-xl h-6 w-5 accent-brightRed"
              />{" "}
              <lable>Bootcamp Publisher</lable>
            </div>
          </form>
          <button
            className="w-full p-2 bg-brightRed text-white hover:bg-brightRedLight "
            onClick={handleRegister}
          >
            Register
          </button>
          <div className="flex flex-col md:flex-row items-center justify-between  mx-auto">
            <Link to="/login" className="text-veryDarkBlue underline">
              Already Have an Account?
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
