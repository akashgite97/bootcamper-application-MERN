import React from "react";
import { FaUnlockAlt } from "react-icons/fa";
import { useState } from "react";

const ResetPassword = () => {
  const [email, setEmail] = useState();

  const handleReset = () => {
    setEmail("");
  };

  return (
    <div className="mt-20 flex items-center justify-center ">
      <div class="md:w-1/3 rounded overflow-hidden shadow-lg p-4 border border-gray">
        <div className="flex items-center justify-center space-x-2 mt-2 text-center font-bold text-2xl">
          <FaUnlockAlt />
          <h1 className="">Reset Passsword</h1>
        </div>
        <p className="p-4 text-md text-center">
          Use this form to reset your password using the registered email
          address
        </p>
        <form className="space-y-6 mt-2 p-2 ">
          <input
            type="email"
            name="email"
            value={email}
            placeholder="Email"
            className="w-full bg-white mb-2 outline-none p-2 border-gray border focus-none "
            onChange={(e) => setEmail(e.target.value)}
          />
        </form>
        <button
          onClick={handleReset}
          className="w-full mt-4 p-2 mb-4 bg-brightRed text-white hover:bg-brightRedLight "
        >
          Reset Password
        </button>
      </div>
    </div>
  );
};

export default ResetPassword;
