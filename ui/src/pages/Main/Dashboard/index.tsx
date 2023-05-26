import Download from "@/components/Download";
import useRating from "@/utils/useRating";
import OkBg from "./assets/spiral_ok.svg";
import BadBg from "./assets/spiral_bad.svg";
import WarningBg from "./assets/spiral_warning.svg";
import { useParams } from "react-router-dom";
import { useViewModel } from "@/utils/useViewModel";
import { DashboardStore } from "./dashboard.vm";
import { useEffect } from "react";
import { toJS } from "mobx";
import { observer } from "mobx-react-lite";

const cardNoPadding =
  "bg-bg-accent rounded-xl shadow-sm flex w-full overflow-hidden";

const card =
  "bg-bg-accent p-8 rounded-xl shadow-sm flex w-full overflow-hidden";

const cardWithHover = card + "hover:shadow-md cursor-pointer transition-shadow";

const StatCard = ({
  progress,
  topText,
  middleText,
  bottomText,
  withGraph = false,
}: {
  progress: number;
  topText: string;
  middleText?: string;
  bottomText?: string;
  withGraph?: boolean;
}) => {
  const { result, textColor, text } = useRating(progress / 10);
  return (
    <div className={`${cardNoPadding} min-h-[200px] relative`}>
      {/* bg */}
      <div
        className={`absolute top-10 left-0 w-full h-full bg-no-repeat bg-contain bg-center`}
      >
        {withGraph && (
          <>
            {result === "ok" ? (
              <OkBg className="w-full" />
            ) : result === "error" ? (
              <BadBg className="w-full mt-2" />
            ) : (
              <WarningBg className="w-full mt-3" />
            )}
          </>
        )}
      </div>
      <div className="relative flex flex-col p-4">
        <h3 className="text-lg font-medium">{topText}</h3>
        <h2 className="text-2xl font-bold">{middleText}</h2>
        <h1 className="font-bold text-5xl mt-auto pt-2">{progress}%</h1>
        <p className={`text-${textColor} font-medium`}>{bottomText ?? text}</p>
      </div>
    </div>
  );
};

const Dashboard = observer(() => {
  const vm = useViewModel(() => new DashboardStore());

  return (
    <div className="flex flex-col max-w-screen-max w-full px-4 lg:px-8 mt-4 md:mt-6 lg:mt-8 gap-3 appear pb-4">
      <div className={`${card} flex-wrap gap-4 items-center`}>
        <div className="flex flex-col">
          <h2 className="text-3xl font-bold">Сводка за неделю</h2>
        </div>
        <Download />
      </div>
      <div className="grid md:grid-cols-3 gap-3">
        <StatCard withGraph progress={74} topText="Все отделения" />
        <StatCard
          withGraph
          progress={93}
          topText="Лучший результат"
          bottomText="Кардиология"
        />
        <StatCard
          withGraph
          progress={33}
          topText="Худший результат"
          bottomText="Неврология"
        />
        <StatCard
          middleText="Елена Олеговна Блиновская"
          progress={100}
          topText="1 место"
        />
        <StatCard
          middleText="Елена Олеговна Блиновская"
          progress={80}
          topText="2 место"
        />
        <StatCard
          middleText="Елена Олеговна Блиновская"
          progress={67}
          topText="3 место"
        />
      </div>
      <div className="flex flex-wrap p-8 bg-primary/70 rounded-xl items-center mt-4 gap-4">
        <h2 className="text-2xl font-medium text-text-onPrimary">
          Сформированные отчёты
        </h2>
        <Download />
      </div>
      {vm.reports.map((r, index) => (
        <div
          key={index}
          className={`appear ${card} flex-wrap gap-4 items-center`}
        >
          <div className="flex flex-col">
            <p className="text-primary">Отчёт №{index + 1}</p>
            <h2 className="text-2xl font-bold">{r.reportName}</h2>
          </div>
          <Download />
        </div>
      ))}
    </div>
  );
});

export default Dashboard;
