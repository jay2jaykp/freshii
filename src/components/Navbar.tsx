import React from "react";
import { Themes } from "~/data";
import { useThemeStore } from "../state/index";

export const Navbar: React.FC = () => {
  const { theme, setTheme } = useThemeStore();
  return (
    <nav className="flex w-screen items-center justify-between p-4 shadow-lg">
      <h2 className="text-xl">Freshii - Ottawa</h2>
      <div>
        <button className="btn-primary btn">Admin</button>
        <div className="dropdown-end dropdown">
          <label tabIndex={0} className="btn m-1">
            Themes
          </label>
          <ul
            tabIndex={0}
            className="dropdown-content menu rounded-box h-96 w-60 flex-nowrap overflow-scroll bg-base-100 p-2 shadow"
          >
            {Themes.map((e) => (
              <li data-theme={e} key={e}>
                <a
                  onClick={() => {
                    setTheme(e);
                    localStorage.setItem("theme", e);
                  }}
                >
                  {e}
                  <div className="flex">
                    <div className="badge"></div>
                    <div className="badge-primary badge"></div>
                    <div className="badge-secondary badge"></div>
                    <div className="badge-accent badge"></div>
                    <div className="badge-info badge"></div>
                  </div>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};
