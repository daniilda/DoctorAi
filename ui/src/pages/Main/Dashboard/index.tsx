import Download from "@/components/Download";
import useRating from "@/utils/useRating";
import OkBg from "./assets/spiral_ok.svg";
import BadBg from "./assets/spiral_bad.svg";
import WarningBg from "./assets/spiral_warning.svg";
import { useViewModel } from "@/utils/useViewModel";
import { DashboardStore } from "./dashboard.vm";
import { observer } from "mobx-react-lite";
import { toJS } from "mobx";
import LoadingEllipsis from "@/components/LoadingEllipsis/LoadingEllipsis";
import cl from "./styles.module.scss";
import ChevronSvg from "@/assets/chevron.svg";
import { useNavigate } from "react-router-dom";

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
  progress?: number;
  topText: string;
  middleText?: string;
  bottomText?: string;
  withGraph?: boolean;
}) => {
  const { result, color, text } = useRating(progress);
  return (
    <div className={`${cardNoPadding} min-h-[200px] relative`}>
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

const Dashboard = observer(() => {
  const vm = useViewModel(() => new DashboardStore());
  const navigate = useNavigate();

  return (
    <div className="flex flex-col max-w-screen-max w-full px-4 lg:px-8 mt-4 md:my-6 lg:my-8 gap-3 appear pb-4">
      <div className={`${card} flex-wrap gap-4 items-center`}>
        <div className="flex flex-col">
          <h2 className="text-3xl font-bold">Сводка за неделю</h2>
        </div>
        <Download wide />
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
      {vm.reports.some((r) => !r.isReady) && (
        <>
          <div className="flex flex-wrap p-8 bg-status-warning/70 rounded-xl items-center mt-4 gap-4">
            <h2 className="text-3xl font-medium text-text-onPrimary">
              Не готовые отчёты
            </h2>
          </div>
          {vm.reports
            .filter((r) => !r.isReady)
            .map((r, index) => (
              <div
                key={index}
                className={`appear ${r.isReady ? cardWithHover : card} ${
                  cl.card
                } gap-4 items-center justify-between`}
                onClick={() => {
                  r.isReady && navigate(`/report/${r.id}`);
                }}
              >
                <div className="flex flex-col">
                  <h2 className="text-2xl font-bold">{r.reportName}</h2>
                  <p className="text-text-secondary text-sm">{r.id}</p>
                </div>
                {r.isReady && (
                  <div className="flex items-center">
                    <ChevronSvg className={cl.card__chevron} />
                  </div>
                )}
              </div>
            ))}
        </>
      )}
      <div className="flex flex-wrap p-8 bg-primary/70 rounded-xl items-center mt-4 gap-4">
        <h2 className="text-3xl font-medium text-text-onPrimary">
          Сформированные отчёты
        </h2>
      </div>
      {vm.reports
        .filter((r) => r.isReady)
        .map((r, index) => (
          <div
            key={index}
            className={`appear ${r.isReady ? cardWithHover : card} ${
              cl.card
            } gap-4 items-center justify-between`}
            onClick={() => {
              r.isReady && navigate(`/report/${r.id}`);
            }}
          >
            <div className="flex flex-col">
              <h2 className="text-2xl font-bold">{r.reportName}</h2>
              <p className="text-text-secondary text-sm">{r.id}</p>
            </div>
            {r.isReady && (
              <div className="flex items-center">
                <ChevronSvg className={cl.card__chevron} />
              </div>
            )}
          </div>
        ))}
    </div>
  );
});

export default Dashboard;
