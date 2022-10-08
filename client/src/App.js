import React from 'react'
import { Suspense } from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import "./App.css";

import LoadingSpinner from './components/common/LoadingSpinner';
import ResetPassword from './components/forms/ResetPassword';
import {useSelector} from 'react-redux'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Bootcamps from './components/Bootcamps';
const Header = React.lazy(()=>import('./components/Header'))
const Home = React.lazy(()=>import('./components/Home/Home.js'))
const Login = React.lazy(()=>import('./components/forms/Login'))
const Register = React.lazy(()=>import('./components/forms/Register'))


function App() {
  const {errorMessage} = useSelector(state => state.auth)

  return (
    <Suspense fallback={<LoadingSpinner />}>
    {errorMessage?.error && toast.error(errorMessage?.error !== "" ? errorMessage?.error : 'Something Went Wrong')} 
      <BrowserRouter>
        <Header />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/forgotPassword" element={<ResetPassword />} />
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/bootcamps" element={<Bootcamps />} />
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </Suspense>
  );
}

export default App;
