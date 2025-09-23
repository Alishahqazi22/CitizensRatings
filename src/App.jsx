import React from "react";
import Layout from "./components/layout/Layout";
import Home from "./components/Pages/Home";
import { Route, Routes, Navigate } from "react-router-dom";
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
import NotFound from "./components/Pages/NotFound";

function App() {
  return (
    <Routes>
      <Route path="*" element={<NotFound />} />

      <Route path="/" element={<Navigate to="/gh" replace />} />

      <Route path="/gh" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="/gh/detail/:category/:id" element={<UserDetailPage />} />
        <Route path="/gh/compare/:category/:id" element={<UserComparePage />} />
        <Route path="/gh/:category/:id/addratting" element={<AddRatingPage />} />
        <Route path="/gh/poll" element={<Poll />} />
        <Route path="/gh/profile/user" element={<ProfileUser />} />
        <Route path="/gh/users/:category" element={<UserList />} />
        <Route path="/gh/poll/:id" element={<PollDetail />} />
        <Route path="/gh/criteria" element={<PollCriteria />} />
        <Route path="/gh/signup" element={<SignUp />} />
        <Route path="/gh/login" element={<Login />} />
      </Route>

      <Route path="/gh" element={<SecondLayout />}>
        <Route path="/gh/addpage.php" element={<AddPage />} />
        <Route path="/gh/forms/add-individuals.php" element={<AddIndividuals />} />
        <Route path="/gh/forms/add-institutions.php" element={<AddInstitutions />} />
        <Route path="/gh/forms/add-policies.php" element={<AddPolicies />} />
        <Route path="/gh/forms/add-others.php" element={<AddOthers />} />
      </Route>
    </Routes>
  );
}

export default App;
