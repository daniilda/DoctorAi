import Logo from "@/assets/logo.svg";
import LoginSvg from "./assets/login.svg";
import ProfileSvg from "./assets/profile.svg";
import { observer } from "mobx-react-lite";
import { Link, useLocation, useNavigate } from "react-router-dom";
import AuthStore from "@/stores/authStore";
import { useRef, useState } from "react";
import { useClickOutside } from "@/utils/useClickOutside";
import LightSvg from "./assets/light.svg";
import DarkSvg from "./assets/dark.svg";
import { ThemeStore } from "@/stores";

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

const Heading = observer(() => {
  const navigate = useNavigate();
  const headingRef = useRef<HTMLDivElement>(null);
  const [expanded, setExpanded] = useState(false);
  useClickOutside([headingRef], () => setExpanded(false));

  return (
    <>
      <nav
        className="h-16 z-10 fixed flex w-full bg-bg-nav/70 backdrop-blur-md justify-center shadow-sm"
        ref={headingRef}
      >
        <div className="max-w-screen-max font-medium w-full items-center flex px-4 lg:px-8">
          <div className="min-w-[120px] max-w-[120px] overflow-hidden transition-none">
            <Logo />
          </div>
          <ul className="ml-8 gap-4 lg:gap-8 lg:ml-12 text-base hidden md:flex select-none">
            <NavLink to="upload">Оценка назначения</NavLink>
            <NavLink to="dashboard">Отчёты</NavLink>
          </ul>
          <div className="ml-auto flex items-center">
            {ThemeStore.theme === "light" ? (
              <DarkSvg
                className="w-8 h-8 fill-text-secondary mr-4 cursor-pointer"
                onClick={() => ThemeStore.setTheme("dark")}
              />
            ) : (
              <LightSvg
                className="w-8 h-8 fill-text-secondary mr-4 cursor-pointer"
                onClick={() => ThemeStore.setTheme("light")}
              />
            )}
            {AuthStore.authState === "anonymous" && (
              <button
                className="flex gap-2 text-primary items-center"
                onClick={() => navigate("/login")}
              >
                <p>Вход</p>
                <LoginSvg />
              </button>
            )}
            {AuthStore.authState === "authorized" && (
              <>
                <div
                  className="flex relative items-center ml-auto"
                  onClick={() => setExpanded((p) => !p)}
                >
                  <div className="items-center hidden md:flex gap-2 lg:gap-3 cursor-pointer">
                    <img
                      src={AuthStore.user?.picUrl}
                      alt="avatar"
                      className="w-10 h-10 rounded-full select-none"
                    />
                    <div className="flex flex-col justify-between">
                      {AuthStore.user?.firstName} {AuthStore.user?.lastName}
                      <p className="text-text-secondary font-normal text-sm">
                        {AuthStore.user?.position}
                      </p>
                    </div>
                  </div>
                  <div className="w-10 h-10 p-2 rounded-full text-primary block md:hidden cursor-pointer">
                    <ProfileSvg />
                  </div>
                  {expanded && (
                    <div className="appear absolute top-16 right-0 min-w-full md:w-48 bg-bg-nav backdrop-blur-md rounded-lg shadow-md">
                      <ul className="flex flex-col gap-2 p-2">
                        <li className="gap-2 items-center flex md:hidden w-max p-1">
                          <img
                            src={AuthStore.user?.picUrl}
                            alt="avatar"
                            className="w-10 h-10 rounded-full"
                          />
                          <div className="flex flex-col justify-between">
                            {AuthStore.user?.firstName}{" "}
                            {AuthStore.user?.lastName}
                            <p className="text-text-secondary font-normal text-sm">
                              {AuthStore.user?.position}
                            </p>
                          </div>
                        </li>
                        <li className="hover:bg-bg-primary hidden md:flex rounded-md p-2 cursor-pointer text-text-disabled">
                          Профиль
                        </li>
                        <li
                          className="hover:bg-bg-primary rounded-md p-2 cursor-pointer"
                          onClick={() => AuthStore.logout()}
                        >
                          Выход
                        </li>
                      </ul>
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </nav>
      {/* measurer */}
      <div className="h-16"></div>
    </>
  );
});

export default Heading;
