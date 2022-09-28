import React from 'react'
import { Suspense } from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import "./App.css";

import LoadingSpinner from './components/common/LoadingSpinner';
import ResetPassword from './components/forms/ResetPassword';
const Header = React.lazy(()=>import('./components/Header'))
const Home = React.lazy(()=>import('./components/Home/Home.js'))
const Login = React.lazy(()=>import('./components/forms/Login'))
const Register = React.lazy(()=>import('./components/forms/Register'))


function App() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/forgotPassword" element={<ResetPassword />} />
          <Route exact path="/register" element={<Register />} />
        </Routes>
      </BrowserRouter>
    </Suspense>
  );
}

export default App;
