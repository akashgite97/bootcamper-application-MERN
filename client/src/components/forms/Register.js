import React from "react";
import { Link } from "react-router-dom";
import { BsPersonPlus } from "react-icons/bs";
import { useState } from "react";
import InputTextField from "../common/InputFileds/inputText";
import { useDispatch, useSelector } from "react-redux";
import { updateFormState, resetFormState } from "../../redux/slice/formSlice";
import { registerUser } from "../../redux/slice/authSlice";
import { toast } from "react-toastify";

const Register = () => {
  const dispatch = useDispatch();
  const { firstName, lastName, email, password, confirmPassword, role } =
    useSelector((state) => state.formData);

  const handleRegister = async () => {
    console.log(email, password);
    dispatch(
      registerUser({
        firstName,
        lastName,
        email,
        password,
        confirmPassword,
        role,
      })
    );
    dispatch(resetFormState());
  };

  const handleOnchange = (event) => {
    const { name, value } = event.target;
    if (password.length === confirmPassword.length &&
        password !== confirmPassword) {
      toast.error("Password does not math");
    }
    dispatch(updateFormState(name, value));
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
              name="firstName"
              value={firstName}
              placeholder="First Name"
              className="w-full outline-none p-2 border-gray border focus-none"
              onChange={handleOnchange}
            />
            <input
              type="text"
              name="lastName"
              value={lastName}
              placeholder="Last Name"
              className="w-full outline-none p-2 border-gray border focus-none "
              onChange={handleOnchange}
            />
            <input
              type="email"
              name="email"
              value={email}
              placeholder="Email"
              className="w-full outline-none p-2 border-gray border focus-none"
              onChange={handleOnchange}
            />

            <InputTextField
              type="text"
              name="password"
              value={password}
              placeholder="Password"
              onChange={handleOnchange}
            />
            <InputTextField
              type="password"
              name="confirmPassword"
              value={confirmPassword}
              placeholder="Confirm Password"
              onChange={handleOnchange}
            />
            <div
              className="flex items-center space-x-2"
              onChange={handleOnchange}
            >
              <input
                type="radio"
                name="role"
                value="user"
                checked={role === "user"}
                className="text-xl h-6 w-5 accent-brightRed"
              />{" "}
              <lable>Regular User</lable>
              <input
                type="radio"
                name="role"
                value="publisher"
                checked={role === "publisher"}
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
