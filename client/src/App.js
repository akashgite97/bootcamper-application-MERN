import React from 'react'
import { Suspense } from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import "./App.css";
const Header = React.lazy(()=>import('./components/Header'))
const Home = React.lazy(()=>import('./components/Home/Home.js'))
const Login = React.lazy(()=>import('./components/Login'))
const Register = React.lazy(()=>import('./components/Register'))

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/register" element={<Register />} />
        </Routes>
      </BrowserRouter>
    </Suspense>
  );
}

export default App;
