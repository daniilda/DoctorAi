import { useState } from "react";
import { cardWithHover } from "../../Report/tailwind";
import { StatCard } from "./StatCard";
import { Dashboard } from "@/api/endpoints";
import ChevronSvg from "@/assets/chevron.svg";

export const StatisticsGrid = (vm: { dashboard: Dashboard | null }) => {
  const [expanded, setExpanded] = useState(true);

  return (
    <div className="flex flex-col gap-3">
      <div
        className={`${cardWithHover} flex-wrap gap-4 items-center justify-between`}
        onClick={() => setExpanded((p) => !p)}
      >
        <h2 className="text-3xl font-bold select-none">Общая сводка</h2>
        <ChevronSvg
          className={`${expanded ? "-rotate-90" : "rotate-90"} w-6 h-6`}
        />
      </div>
      {expanded && (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          <StatCard
            withGraph
            progress={vm.dashboard?.avgPerc}
            topText="Все отделения"
          />
          <StatCard
            withGraph
            progress={vm.dashboard?.topDivisionPerc}
            topText="Лучший результат"
            bottomText={vm.dashboard?.topDivisionName}
          />
          <StatCard
            withGraph
            progress={vm.dashboard?.lastDivisionPerc}
            topText="Худший результат"
            bottomText={vm.dashboard?.lastDivisionName}
          />
          <StatCard
            middleText={vm.dashboard?.top1}
            progress={vm.dashboard?.top1Val}
            topText="1 место"
          />
          <StatCard
            middleText={vm.dashboard?.top2}
            progress={vm.dashboard?.top2Val}
            topText="2 место"
          />
          <StatCard
            middleText={vm.dashboard?.top3}
            progress={vm.dashboard?.top3Val}
            topText="3 место"
          />
        </div>
      )}
    </div>
  );
};
