import AuthStore from "@/stores/authStore";
import { observer } from "mobx-react-lite";
import React from "react";
import { Link, useLocation } from "react-router-dom";

const NavLink = ({ to, children }: { to: string; children: string }) => {
  const { pathname } = useLocation();
  return (
    <li>
      <Link
        to={to}
        className={`${
          pathname.includes(to) ? "text-primary" : "text-text-main"
        } hover:drop-shadow-sm`}
      >
        {children}
      </Link>
    </li>
  );
};

export const AppLinks = observer(() => {
  if (AuthStore.authState === "anonymous" || AuthStore.authState === "loading")
    return null;

  return (
    <ul className="appear ml-8 gap-4 lg:gap-8 lg:ml-12 text-base hidden md:flex select-none">
      <NavLink to="upload">Оценка назначения</NavLink>
      <NavLink to="dashboard">Отчёты</NavLink>
    </ul>
  );
});
