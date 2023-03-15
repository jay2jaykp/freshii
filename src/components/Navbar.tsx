import React from "react";
import {} from "react";

export const Navbar: React.FC = () => {
  return (
    <nav className="flex w-screen flex-row items-center justify-between p-4 shadow-lg sm:flex-row">
      <h2 className="text-xl">Freshii - Kanata North</h2>
      <div className="flex flex-row items-center">
        <button disabled className="btn-primary btn-sm btn">
          Admin
        </button>
      </div>
    </nav>
  );
};
