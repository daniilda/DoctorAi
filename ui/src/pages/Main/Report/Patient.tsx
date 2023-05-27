import { observer } from "mobx-react-lite";
import ChevronSvg from "@/assets/chevron.svg";
import { Button } from "@/components/ui";
import { card } from "./tailwind";
import toFullName from "@/utils/toFullName";
import useRating from "@/utils/useRating";
import { Appointment } from "@/api/endpoints";
import Download from "@/components/Download";
import { useEffect } from "react";
import { ReportStore } from "@/stores/reportStore";

const parseAppointment = (state: number): [color: string, text: string] => {
  switch (state) {
    case 1:
      return ["var(--colors-status-ok)", "Указано"];
    case 2:
      return ["var(--colors-status-warning)", "Лишнее назначение"];
    case 3:
      return ["var(--colors-status-error)", "Не указано"];
    default:
      return ["var(--colors-status-warning)", "Нет информации"];
  }
};

const AppointmentCard = (a: Appointment) => {
  const [color, text] = parseAppointment(a.appointmentState);

  return (
    <div className={`${card} flex-wrap items-center justify-between gap-4`}>
      <div className="flex flex-col gap-1">
        <h2 className="text-3xl font-bold">{a.name}</h2>
      </div>
      <div
        className="px-4 py-2 rounded-lg font-medium text-xl h-[52px] md:w-auto flex justify-center items-center select-none"
        style={{
          color: `rgb(${color})`,
          backgroundColor: `rgba(${color}, 0.2)`,
        }}
      >
        {text}
      </div>
    </div>
  );
};

const Patient = observer(({ onReturn }: { onReturn: () => void }) => {
  const vm = ReportStore;

  const [patientColor, patientText] = (() => {
    if (
      vm.selectedPatient?.reportAppointments.some(
        (v) => v.appointmentState !== 1
      )
    ) {
      return ["var(--colors-status-warning)", "Есть замечания"];
    } else {
      return ["var(--colors-status-ok)", "Верные указания"];
    }
  })();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="grid gap-3 w-full">
      <div className="flex flex-col gap-3">
        <div className="flex flex-wrap items-center gap-2">
          <div
            className="gap-2 text-text-secondary hover:text-text-main cursor-pointer select-none hidden md:flex"
            onClick={() => {
              onReturn();
              vm.selectedDoctor = null;
            }}
          >
            <ChevronSvg width="20" className="rotate-180" />
            <p className="text-2xl">{vm.report?.reportName}</p>
          </div>
          <div
            className="gap-2 text-text-secondary hover:text-text-main cursor-pointer select-none flex"
            onClick={() => {
              onReturn();
            }}
          >
            <ChevronSvg width="20" className="rotate-180" />
            <p className="text-2xl">{toFullName(vm.selectedDoctor ?? {})}</p>
          </div>
        </div>
      </div>
      <div
        className={`${card} flex-wrap items-center gap-4`}
        style={{
          borderBottom: `4px solid rgb(${patientColor})`,
        }}
      >
        <div className="flex flex-col justify-center flex-1 gap-1">
          <h3 className="font-medium" style={{ color: `rgb(${patientColor})` }}>
            {vm.selectedPatient?.diagnosis}
          </h3>
          <h2 className="text-2xl font-bold">
            {toFullName(vm.selectedPatient ?? {})}
          </h2>
        </div>
        <div
          className={`flex px-4 py-2 w-full h-[52px] md:w-auto justify-center items-center font-medium text-xl rounded-lg select-none`}
          style={{
            backgroundColor: `rgba(${patientColor}, 0.2)`,
            color: `rgb(${patientColor})`,
          }}
        >
          {patientText}
        </div>
        <Download
          pdf={vm.selectedPatient?.pdfUrl}
          docx={vm.selectedPatient?.docxUrl}
        />
      </div>
      {vm.selectedPatient?.reportAppointments.map((p, index) => (
        <AppointmentCard key={index} {...p} />
      ))}
    </div>
  );
});

export default Patient;
