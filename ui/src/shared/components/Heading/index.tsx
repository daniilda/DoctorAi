import Logo from "@/assets/logo.svg";
import LoginSvg from "./assets/login.svg";
import { observer } from "mobx-react-lite";
import { Link, useLocation, useNavigate } from "react-router-dom";

const NavLink = ({ to, children }: { to: string; children: string }) => {
  const { pathname } = useLocation();
  return (
    <li>
      <Link
        to={to}
        className={`${
          pathname === to ? "text-primary" : ""
        } hover:drop-shadow-sm`}
      >
        {children}
      </Link>
    </li>
  );
};

const Heading = observer(() => {
  const navigate = useNavigate();
  return (
    <nav className="min-h-[64px] overflow-hidden bg-bg-nav flex justify-center">
      <div className="max-w-screen-max font-medium w-full px-2 lg:px-8 flex items-center">
        <Logo width="120" />
        <ul className="flex ml-8 gap-4 lg:gap-8 lg:ml-12 text-base">
          <NavLink to="/submit">Оценка назначения</NavLink>
          <NavLink to="/stats">Статистика</NavLink>
          <NavLink to="/help">Помощь</NavLink>
        </ul>
        <button
          className="ml-auto flex gap-2 text-primary items-center"
          onClick={() => navigate("/login")}
        >
          Вход
          <LoginSvg />
        </button>
      </div>
    </nav>
  );
});

export default Heading;
