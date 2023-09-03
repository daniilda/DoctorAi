import ProfileSvg from "../assets/profile.svg";
import { useRef, useState } from "react";
import { useClickOutside } from "@/utils/useClickOutside";
import AuthStore from "@/stores/authStore";
import { observer } from "mobx-react-lite";
import { useNavigate } from "react-router-dom";
import LoginSvg from "../assets/login.svg";

export const ProfileBadge = observer(() => {
  const profileRef = useRef<HTMLDivElement>(null);
  const [expanded, setExpanded] = useState(false);
  useClickOutside([profileRef], () => setExpanded(false));
  const navigate = useNavigate();

  if (AuthStore.authState === "loading") return null;

  if (AuthStore.authState === "anonymous")
    return (
      <button
        className="flex gap-2 text-primary items-center"
        onClick={() => navigate("/login")}
      >
        <p>Вход</p>
        <LoginSvg />
      </button>
    );

  return (
    <div
      className="flex relative items-center ml-auto"
      onClick={() => setExpanded((p) => !p)}
      ref={profileRef}
    >
      <div className="items-center hidden md:flex gap-2 lg:gap-3 cursor-pointer">
        <img
          src={AuthStore.user?.picUrl}
          alt="avatar"
          className="w-10 h-10 rounded-full select-none object-cover"
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
        <div className="appear absolute top-12 right-0 min-w-full md:w-48 bg-bg-nav backdrop-blur-md rounded-lg shadow-md">
          <ul className="flex flex-col p-2">
            <li className="gap-2 items-center flex md:hidden w-max p-1">
              <img
                src={AuthStore.user?.picUrl}
                alt="avatar"
                className="w-10 h-10 rounded-full"
              />
              <div className="flex flex-col justify-between">
                {AuthStore.user?.firstName} {AuthStore.user?.lastName}
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
  );
});
