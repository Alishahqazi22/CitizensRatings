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
import ProfileUser from "./components/UserProfile/ProfileUser";
import PollCriteria from "./components/Poll/PollCriteria";
import SecondLayout from "./components/secondLayout/SecondLayout";
import AddPage from "./components/Pages/AddPage";
import AddIndividuals from "./components/Forms/AddIndividuals";
import AddInstitutions from "./components/Forms/AddInstitutions";
import AddPolicies from "./components/Forms/AddPolicies";
import AddOthers from "./components/Forms/AddOthers";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="/detail/:category/:id" element={<UserDetailPage />} />
        <Route path="/compare/:category/:id" element={<UserComparePage />} />
        <Route path="/:category/:id/addratting" element={<AddRatingPage />} />
        <Route path="/poll" element={<Poll />} />
        <Route path="/profile/user" element={<ProfileUser />} />
        <Route path="/users/:category" element={<UserList />} />
        <Route path="/poll/:id" element={<PollDetail />} />
        <Route path="/criteria" element={<PollCriteria />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
      </Route>
        <Route path="/" element={<SecondLayout />}>
          <Route path="/addpage.php" element={<AddPage />} />
          <Route path="/forms/add-individuals.php" element={<AddIndividuals />} />
          <Route path="/forms/add-institutions.php" element={<AddInstitutions />} />
          <Route path="/forms/add-policies.php" element={<AddPolicies />} />
          <Route path="/forms/add-others.php" element={<AddOthers />} />
        </Route>
    </Routes>
  );
}

export default App;
