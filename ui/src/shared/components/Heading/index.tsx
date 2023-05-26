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
          pathname === to ? "text-primary" : "text-text-main"
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
    <nav className="min-h-[64px] w-full overflow-hidden bg-bg-nav flex justify-center shadow-sm">
      <div className="max-w-screen-max font-medium w-full items-center flex px-4 lg:px-8">
        <div className="min-w-[120px] max-w-[120px] overflow-hidden">
          <Logo />
        </div>
        <ul className="ml-8 gap-4 lg:gap-8 lg:ml-12 text-base hidden md:flex">
          <NavLink to="/upload">Оценка назначения</NavLink>
          <NavLink to="/dashboard">Отчёты</NavLink>
          <NavLink to="/help">Помощь</NavLink>
        </ul>
        <button
          className="ml-auto flex gap-2 text-primary items-center"
          onClick={() => navigate("/login")}
        >
          <p>Вход</p>
          <LoginSvg />
        </button>
      </div>
    </nav>
  );
});

export default Heading;
