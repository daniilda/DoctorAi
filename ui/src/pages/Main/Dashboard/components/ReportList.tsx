import { ReportResult } from "@/api/endpoints";
import React, { useState } from "react";
import ChevronSvg from "@/assets/chevron.svg";
import { ReportCard } from "./ReportCard";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui";
import PlusSvg from "@/assets/plus.svg";

interface ReportListProps {
  type: "ready" | "processing";
  reports: ReportResult[];
  isLoaded: boolean;
}

export const ReportList: React.FC<ReportListProps> = ({
  type,
  reports,
  isLoaded,
}) => {
  const [expanded, setExpanded] = useState(type === "ready");
  const navigate = useNavigate();

  return (
    <section className="flex flex-col gap-3">
      <div
        className={`appear flex justify-between p-8 ${
          type === "processing" ? "bg-status-warning/70" : "bg-primary/70"
        } rounded-xl items-center mt-4 gap-4 cursor-pointer text-text-onPrimary`}
        onClick={() => setExpanded((p) => !p)}
      >
        <h2 className="text-2xl md:text-3xl font-medium select-none">
          {type === "processing" ? "Не готовые отчёты" : "Готовые отчёты"}
        </h2>
        <ChevronSvg
          className={`${expanded ? "-rotate-90" : "rotate-90"} w-6 h-6`}
        />
      </div>
      {expanded &&
        (reports.length > 0 ? (
          reports.map((r, i) => (
            <ReportCard
              key={i}
              onClick={() => {
                navigate(`/report/${r.id}`);
              }}
              report={r}
            />
          ))
        ) : isLoaded && type === "processing" ? (
          <h2 className="p-8 mt-4 text-2xl md:text-3xl font-medium select-none">
            Все отчёты готовы!
          </h2>
        ) : (
          <div className="flex justify-between flex-wrap items-center p-8">
            <div className="flex flex-col">
              <h2 className="text-3xl font-medium text-text-primary">
                Создайте свой первый отчёт!
              </h2>
              <p className="text-lg text-text-primary">
                Перед просмотром отчёта, необходимо создать первый
              </p>
            </div>
            <Button
              rounded="xl"
              className="flex items-center px-4 gap-2"
              onClick={() => navigate("/upload")}
            >
              <PlusSvg className="w-6 h-6" />
              Создать отчёт
            </Button>
          </div>
        ))}
    </section>
  );
};
