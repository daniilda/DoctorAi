import { Button } from "@/components/ui";
import React from "react";
import { card } from "../../Report/tailwind";
import { useNavigate } from "react-router-dom";
import PlusSvg from "@/assets/plus.svg";

export const DashboardHeading = () => {
  const navigate = useNavigate();
  return (
    <div className={`${card} flex-wrap gap-4 items-center justify-between`}>
      <h2 className="text-3xl font-bold select-none">Общая сводка</h2>
      <Button
        rounded="xl"
        className="items-center px-4 gap-2 hidden md:flex"
        onClick={() => navigate("/upload")}
      >
        <PlusSvg className="w-6 h-6" />
        Новый отчёт
      </Button>
    </div>
  );
};
