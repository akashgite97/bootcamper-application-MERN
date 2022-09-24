import React from "react";
import { Link } from "react-router-dom";
import { BsPersonPlus } from "react-icons/bs";
import { useState } from "react";

const Register = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const handleRegister=()=>{
    console.log(email,password);
    setEmail('')
    setPassword('')
  }

  return (
    <div className="mt-20 flex items-center justify-center ">
      <div class="md:max-w-md rounded overflow-hidden shadow-lg p-4">
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
              onChange={(e)=>setEmail(e.target.value)}
            />
            <input
              type="email"
              name="email"
              value={email}
              placeholder="Email"
              className="w-full outline-none p-2 border-gray border focus-none"
              onChange={(e)=>setEmail(e.target.value)}
            />

            <input
              type="text"
              name="password"
              value={password}
              placeholder="Password"
              className="w-full bg-white outline-none p-2 border-gray border focus-none"
              onChange={(e)=>setPassword(e.target.value)}
            />
            <input
              type="password"
              name="confirmPassword"
              value={password}
              placeholder="Confirm Password"
              className="w-full bg-white outline-none p-2 border-gray border focus-none"
              onChange={(e)=>setPassword(e.target.value)}
            />
          </form>
          <button className="w-full p-2 bg-brightRed text-white hover:bg-brightRedLight " onClick={handleRegister}>Register</button>
          <div className="flex flex-col md:flex-row items-center justify-between  mx-auto">
            <div className="flex items-center">
              <input
                type="checkbox"
                name="rememberMe"
                value=""
                className="text-xl h-6 w-4"
              />
              <label for="rememberMe" className="ml-1">
                Remember me
              </label>
            </div>
            <div>
              <Link
                to="/forgotpassword"
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

export default Register;
