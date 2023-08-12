import React from "react";
import { StatCard } from "./StatCard";
import { Dashboard } from "@/api/endpoints";

export const StatisticsGrid = (vm: { dashboard: Dashboard | null }) => {
  return (
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
  );
};
