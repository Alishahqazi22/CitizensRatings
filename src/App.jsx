import React from "react";
import Layout from "./components/layout/Layout";
import Home from "./components/Pages/Home";
import { Route, Routes } from "react-router-dom";
import SignUp from "./components/Forms/SignUp";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />}/>
        <Route path="/signup" element={<SignUp />}/>
      </Route>
    </Routes>
  );
}

export default App;
