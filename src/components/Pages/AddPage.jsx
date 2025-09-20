import React from "react";
import AddPageHeroSection from "../AddPage/AddPageHeroSection";
import FormsCards from "../AddPage/FormsCards";
import RateProfessor from "../AddPage/RateProfessor";
import RateSchool from "../AddPage/RateSchool";
import RateCourse from "../AddPage/RateCourse";

function AddPage() {
  return (
    <>
      <AddPageHeroSection title="Forms" />
      <FormsCards />
      <RateProfessor />
      <RateSchool />
      <RateCourse />
    </>
  );
}

export default AddPage;
