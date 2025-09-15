import React from "react";
import Layout from "./components/layout/Layout";
import Home from "./components/Pages/Home";
import { Route, Routes } from "react-router-dom";
import SignUp from "./components/Forms/SignUp";
import Login from "./components/Forms/Login";
import UserDetailPage from "./components/UserProfile/UserDetailPage";
import Poll from "./components/Poll/Poll";
import PollDetail from "./components/Poll/PollDetail";
import UserComparePage from "./components/UserProfile/UserComparePage";
import AddRatingPage from "./components/Forms/AddRatingPage";
import UserList from "./components/UserProfile/UserList";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />}/>
        <Route path="/detail/:category/:id" element={<UserDetailPage />}/>
        <Route path="/compare/:category/:id" element={<UserComparePage />}/>
        <Route path="/:category/:id/addratting" element={<AddRatingPage />}/>
        <Route path="/poll" element={<Poll />}/>
        <Route path="/user" element={<UserList />}/>
        <Route path="/poll/:id" element={<PollDetail />}/>
        <Route path="/signup" element={<SignUp />}/>
        <Route path="/login" element={<Login />}/>
      </Route>
    </Routes>
  );
}

export default App;
