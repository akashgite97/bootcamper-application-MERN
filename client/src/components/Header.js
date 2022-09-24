import React from "react";
import { Link } from "react-router-dom";
import { BsBoxArrowInRight, BsPersonPlus, BsPerson } from "react-icons/bs";
import { BiLaptop } from "react-icons/bi";

const Header = () => {
  return (
    <nav className="flex items-center justify-around mx-auto flex-col bg-brightRed p-4 text-white md:flex-row">
      <div className="flex items-center space-x-1">
        <BiLaptop size={25} />
        <Link to="/" className="font-bold text-xl md:text-xl">
          DevCamper
        </Link>
      </div>
      <div className="flex flex-col items-center justify-center space-y-2 md:space-x-4 md:space-y-0 md:flex-row">
        <div className="flex items-center mt-4 space-x-1 md:mt-0">
          <BsBoxArrowInRight size={20} />
          <Link to="/login">Login</Link>
        </div>
        <div className="flex items-center space-x-1">
          <BsPersonPlus size={20} />
          <Link to="/register">Register</Link>
        </div>
        <div className="flex items-center space-x-2">
          <p>|</p>
          <Link to="/bootcamps">Browse Bootcamps</Link>
        </div>
        <div className="flex items-center space-x-1">
          <BsPerson size={20} />
          <Link to="/bootcamps">Account</Link>
        </div>
      </div>
    </nav>
  );
};

export default Header;
