import Download from "@/components/Download";
import useRating from "@/utils/useRating";
import OkBg from "./assets/spiral_ok.svg";
import BadBg from "./assets/spiral_bad.svg";
import WarningBg from "./assets/spiral_warning.svg";
import { useViewModel } from "@/utils/useViewModel";
import { DashboardStore } from "./dashboard.vm";
import { observer } from "mobx-react-lite";
import LoadingEllipsis from "@/components/LoadingEllipsis/LoadingEllipsis";
import cl from "./styles.module.scss";
import ChevronSvg from "@/assets/chevron.svg";
import { useNavigate } from "react-router-dom";
import { ReportEndpoint, ReportResult } from "@/api/endpoints";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui";
import PlusSvg from "@/assets/plus.svg";

const cardNoPadding =
  "bg-bg-accent rounded-xl shadow-sm flex w-full overflow-hidden";

const card =
  "bg-bg-accent p-8 rounded-xl shadow-sm flex w-full overflow-hidden";

const cardWithHover =
  card + " hover:shadow-md cursor-pointer transition-shadow";

const StatCard = ({
  progress,
  topText,
  middleText,
  bottomText,
  withGraph = false,
}: {
  progress?: number;
  topText: string;
  middleText?: string;
  bottomText?: string;
  withGraph?: boolean;
}) => {
  const { result, color, text } = useRating(progress);
  return (
    <div className={`${cardNoPadding} select-none min-h-[200px] relative`}>
      {typeof progress === "number" ? (
        <>
          <div
            className={`appear absolute top-10 left-0 w-full h-full bg-no-repeat bg-contain bg-center`}
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
            <p className={`font-medium`} style={{ color }}>
              {bottomText ?? text}
            </p>
          </div>
        </>
      ) : (
        <div className="w-full h-full flex items-center justify-center">
          <LoadingEllipsis />
        </div>
      )}
    </div>
  );
};

const ReportCard = ({
  r,
  onClick,
}: {
  r: ReportResult;
  onClick: () => void;
}) => (
  <div
    className={`${cardWithHover} ${cl.card} gap-4 items-center`}
    onClick={onClick}
  >
    <div className="flex flex-1 flew-wrap flex-col md:flex-row gap-4">
      <div className="flex flex-col">
        <h2 className="text-2xl font-bold">{r.reportName}</h2>
        <p className="text-text-secondary text-sm font-medium">
          {new Date(r.createdAt).toLocaleString()}
        </p>
      </div>
      {r.isReady && <Download wide pdf={r.pdfUrl} docx={r.docxUrl} />}
    </div>
    <div className="flex items-center ml-auto">
      <ChevronSvg className={cl.card__chevron} />
    </div>
  </div>
);

const Dashboard = observer(() => {
  const vm = DashboardStore;
  const navigate = useNavigate();
  const [readyReportsExpanded, setReadyReportsExpanded] = useState(true);
  const [notReadyReportsExpanded, setNotReadyReportsExpanded] = useState(false);
  const [navigating, setNavigating] = useState(false);

  const navigateTo = (path: string) => {
    setNavigating(true);
    setTimeout(() => {
      navigate(path);
    }, 150);
  };

  useEffect(() => {
    const interval = setInterval(vm.updateDashboard, 30000);
    vm.updateDashboard();
    return () => {
      clearInterval(interval);
    };
  }, [vm]);

  return (
    <div
      className={`${
        navigating && "hide"
      } flex flex-col max-w-screen-max w-full px-4 lg:px-8 mt-4 md:my-6 lg:my-8 gap-3 appear pb-4`}
    >
      <div className={`${card} flex-wrap gap-4 items-center justify-between`}>
        <h2 className="text-3xl font-bold">Общая сводка</h2>
        <Button
          rounded="xl"
          className="items-center px-4 gap-2 hidden md:flex"
          onClick={() => navigateTo("/upload")}
        >
          <PlusSvg className="w-6 h-6" />
          Новый отчёт
        </Button>
        {/* <Download wide pdf={vm.dashboard?.pdfUrl} docx={vm.dashboard?.docxUrl} /> */}
      </div>
      <div className="grid md:grid-cols-3 gap-3">
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
      <div
        className="appear flex justify-between p-8 bg-status-warning/70 rounded-xl items-center mt-4 gap-4 cursor-pointer"
        onClick={() => setNotReadyReportsExpanded((p) => !p)}
      >
        <h2 className="text-2xl md:text-3xl font-medium text-text-onPrimary select-none">
          Не готовые отчёты
        </h2>
        <ChevronSvg
          className={`${
            notReadyReportsExpanded ? "-rotate-90" : "rotate-90"
          } w-6 h-6 text-bg-accent`}
        />
      </div>
      {notReadyReportsExpanded &&
        vm.reports
          .filter((r) => !r.isReady)
          .map((r, index) => (
            <ReportCard
              key={index}
              onClick={() => navigateTo(`/report/${r.id}`)}
              r={r}
            />
          ))}
      <div
        className="appear flex justify-between p-8 bg-primary/70 rounded-xl items-center mt-4 gap-4 cursor-pointer"
        onClick={() => setReadyReportsExpanded((p) => !p)}
      >
        <h2 className="text-2xl md:text-3xl font-medium text-text-onPrimary select-none">
          Составленные отчёты
        </h2>
        <ChevronSvg
          className={`${
            readyReportsExpanded ? "-rotate-90" : "rotate-90"
          } w-6 h-6 text-bg-accent`}
        />
      </div>
      {readyReportsExpanded && vm.reports.some((r) => r.isReady)
        ? vm.reports
            .filter((r) => r.isReady)
            .map((r, index) => (
              <ReportCard
                key={index}
                onClick={() => {
                  ReportEndpoint.getReport(r.id);
                  navigateTo(`/report/${r.id}`);
                }}
                r={r}
              />
            ))
        : vm.reports === undefined && (
            <div className="flex flex-col items-center justify-center my-6">
              <h2 className="text-3xl font-medium text-text-primary text-center">
                Создайте свой первый отчёт!
              </h2>
              <p className="text-lg text-text-primary text-center">
                Перед просмотром отчётов, необходимо создать первый
              </p>
              <Button
                rounded="xl"
                className="flex items-center px-4 gap-2 mt-4"
                onClick={() => navigateTo("/upload")}
              >
                <PlusSvg className="w-6 h-6" />
                Создать отчёт
              </Button>
            </div>
          )}
    </div>
  );
});

export default Dashboard;
