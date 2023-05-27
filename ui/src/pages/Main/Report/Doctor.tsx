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

const PatientCard = ({
  p,
  onClick,
}: {
  p: Patient;
  onClick: (p: Patient) => void;
}) => {
  return (
    <div
      className={`${cardWithHover} ${cl.card} flex-wrap items-center justify-between gap-4`}
      onClick={() => onClick(p)}
    >
      <div className="flex flex-col gap-1">
        <p className="text-primary">Пациент</p>
        <h2 className="text-2xl font-bold">{toFullName(p)}</h2>
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
        {vm.selectedDoctor?.patients.map((p, index) => (
          <PatientCard key={index} p={p} onClick={onPatientClick} />
        ))}
      </div>
    );
  }
);

export default Doctor;
