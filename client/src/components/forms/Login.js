import React from "react";
import { Link } from "react-router-dom";
import { BsBoxArrowInRight } from "react-icons/bs";
import { useState } from "react";

const Login = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const handleLogin = () => {
    console.log(email, password);
    setEmail("");
    setPassword("");
  };

  return (
    <div className="mt-20 flex items-center justify-center ">
      <div class="md:max-w-md rounded overflow-hidden shadow-lg p-4 border border-gray">
        <div className="flex items-center justify-center space-x-2 mt-2 text-center font-bold text-2xl">
          <BsBoxArrowInRight />
          <h1 className="">Login</h1>
        </div>
        <div className="mt-2 space-y-6 p-4">
          <form className="space-y-6">
            <input
              type="email"
              name="email"
              value={email}
              placeholder="Email"
              className="w-full outline-none p-2 border-gray border focus-none"
              onChange={(e) => setEmail(e.target.value)}
            />

            <input
              type="password"
              name="password"
              value={password}
              placeholder="Password"
              className="w-full bg-white outline-none p-2 border-gray border focus-none"
              onChange={(e) => setPassword(e.target.value)}
            />
          </form>
          <button
            className="w-full p-2 bg-brightRed text-white hover:bg-brightRedLight "
            onClick={handleLogin}
          >
            Login
          </button>
          <div className="flex flex-col md:flex-row items-center justify-between  mx-auto">
            <div className="flex items-center">
              <input
                type="checkbox"
                name="rememberMe"
                value=""
                className="text-xl h-6 w-4 accent-brightRed"
              />
              <label for="rememberMe" className="ml-1">
                Remember me
              </label>
            </div>
            <div>
              <Link
                to="/forgotPassword"
                className="text-veryDarkBlue underline"
              >
                Forgot Password
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
