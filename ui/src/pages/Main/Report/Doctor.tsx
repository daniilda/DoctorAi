import { observer } from "mobx-react-lite";
import ChevronSvg from "@/assets/chevron.svg";
import { Button } from "@/components/ui";
import { card, cardWithHover } from "./tailwind";
import toFullName from "@/utils/toFullName";
import useRating from "@/utils/useRating";
import { Patient } from "@/api/endpoints";
import Download from "@/components/Download";
import { useEffect } from "react";
import { ReportStore } from "@/stores/reportStore";
import cl from "./styles.module.scss";

function pluralize(count: number) {
  if (count % 10 === 1 && count % 100 !== 11) {
    return count + " заключение";
  } else if (
    count % 10 >= 2 &&
    count % 10 <= 4 &&
    (count % 100 < 10 || count % 100 >= 20)
  ) {
    return count + " заключения";
  } else {
    return count + " заключений";
  }
}

const PatientCard = ({ p, onClick }: { p: Patient; onClick: () => void }) => {
  const [color, text] = (() => {
    switch (p.rate) {
      case 1:
        return ["var(--colors-status-ok)", "Правильные заключения"];
      case 2:
        return ["var(--colors-status-error)", "Недостающие заключения"];
      case 3:
        return ["var(--colors-status-error)", "Лишние заключения"];
      default:
        return ["var(--colors-status-warning)", "Нет информации"];
    }
  })();
  return (
    <div
      className={`${cardWithHover} ${cl.card} items-center justify-between gap-4`}
      onClick={onClick}
    >
      <div className="flex flex-col gap-1">
        <h2 className="text-2xl font-bold">{toFullName(p)}</h2>
        {/* сделай так чтобы менялось окончания в зависимости от числа p.reportAppointments.length */}

        <p className="text-primary text-lg">
          {pluralize(p.reportAppointments.length)}
        </p>
      </div>
      <div className="flex items-center">
        <ChevronSvg className={cl.card__chevron} />
      </div>
    </div>
  );
};

const Doctor = observer(
  ({ onPatientClick }: { onPatientClick: (p: Patient) => void }) => {
    const vm = ReportStore;
    const { text, color, backgroundColor } = useRating(vm.selectedDoctor?.rate);

    useEffect(() => {
      window.scrollTo(0, 0);
    }, []);

    return (
      <div className="grid gap-3 w-full">
        <div className="flex flex-col gap-3">
          <Button
            rounded="xl"
            appearance="secondary"
            className="flex items-center pl-4"
            onClick={() => (vm.selectedDoctor = null)}
          >
            <ChevronSvg width="20" className="rotate-180 mr-2" />
            <p className="text-xl">{vm.report?.reportName}</p>
          </Button>
        </div>
        <div
          className={`${card} flex-wrap items-center gap-4`}
          style={{
            borderBottom: `4px solid ${color}`,
          }}
        >
          <div className="flex flex-col justify-center flex-1 gap-1">
            <h3 style={{ color }}>{vm.selectedDoctor?.position}</h3>
            <h2 className="text-2xl font-bold">
              {toFullName(vm.selectedDoctor ?? {})}
            </h2>
          </div>
          <div
            className={`flex px-4 py-2 w-full h-[52px] md:w-auto justify-center items-center font-medium text-xl rounded-lg`}
            style={{ backgroundColor, color }}
          >
            {text}
          </div>
          <Download />
        </div>
        {vm.selectedDoctor?.reportPatients.map((p, index) => (
          <PatientCard key={index} p={p} onClick={() => onPatientClick(p)} />
        ))}
      </div>
    );
  }
);

export default Doctor;
