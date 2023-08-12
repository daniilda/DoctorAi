import { DashboardStore } from "./dashboard.vm";
import { observer } from "mobx-react-lite";
import { useNavigate } from "react-router-dom";
import { ReportResult } from "@/api/endpoints";
import { useEffect, useState } from "react";
import { StatisticsGrid } from "./components/StatisticsGrid";
import { DashboardHeading } from "./components/DashboardHeading";
import { ReportList } from "./components/ReportList";

const DASHBOARD_REFRESH_INTERVAL_MS = 30_000;

const Dashboard = observer(() => {
  const vm = DashboardStore;
  const [readyReports, setReadyReports] = useState<ReportResult[]>([]);
  const [processingReports, setProcessingReports] = useState<ReportResult[]>(
    []
  );

  useEffect(() => {
    const interval = setInterval(
      vm.updateDashboard,
      DASHBOARD_REFRESH_INTERVAL_MS
    );
    vm.updateDashboard();

    return () => {
      clearInterval(interval);
    };
  }, [vm]);

  useEffect(() => {
    setReadyReports(
      vm.reports
        .filter((r) => r.isReady)
        .sort((a, b) => {
          const aDate = new Date(a.createdAt);
          const bDate = new Date(b.createdAt);
          return bDate.getTime() - aDate.getTime();
        })
    );
    setProcessingReports(
      vm.reports
        .filter((r) => !r.isReady)
        .sort((a, b) => {
          const aDate = new Date(a.createdAt);
          const bDate = new Date(b.createdAt);
          return bDate.getTime() - aDate.getTime();
        })
    );
  }, [vm.reports]);

  return (
    <main className="flex flex-col max-w-screen-max w-full px-4 lg:px-8 mt-4 md:my-6 lg:my-8 gap-3 pb-4">
      <DashboardHeading />
      <StatisticsGrid dashboard={vm.dashboard} />
      <ReportList
        type="processing"
        reports={processingReports}
        isLoaded={vm.wasLoaded}
      />
      <ReportList type="ready" reports={readyReports} isLoaded={vm.wasLoaded} />
    </main>
  );
});

export default Dashboard;
