import React from "react";
import { Outlet } from "react-router-dom";
import SecondFooter from "./SecondFooter";
import SecondHeader from "./SecondHeader";
import { FaArrowTurnUp } from "react-icons/fa6";

const SecondLayout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="z-99999">
        <SecondHeader />
      </header>
      <main className="flex-1">
        <Outlet />
        <button
          className="fixed bottom-5 right-5 bg-primary text-white p-3 border-[3px] rounded border-white shadow-lg"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          <FaArrowTurnUp />
        </button>
      </main>
      <footer>
        <SecondFooter />
      </footer>
    </div>
  );
};

export default SecondLayout;
