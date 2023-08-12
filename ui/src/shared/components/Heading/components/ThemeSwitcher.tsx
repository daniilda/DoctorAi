import { ThemeStore } from "@/stores";
import { observer } from "mobx-react-lite";
import React from "react";
import LightSvg from "../assets/light.svg";
import DarkSvg from "../assets/dark.svg";

export const ThemeSwitcher = observer(() =>
  ThemeStore.theme === "light" ? (
    <DarkSvg
      className="w-7 h-7 fill-text-secondary mr-4 cursor-pointer"
      onClick={() => ThemeStore.setTheme("dark")}
    />
  ) : (
    <LightSvg
      className="w-7 h-7 fill-text-secondary mr-4 cursor-pointer"
      onClick={() => ThemeStore.setTheme("light")}
    />
  )
);
