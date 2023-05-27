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

const AppointmentCard = (a: Appointment) => {
  const [color, text] = (() => {
    switch (a.appointmentState) {
      case 1:
        return ["var(--colors-status-ok)", "Указано"];
      case 2:
        return ["var(--colors-status-warning)", "Лишнее назначение"];
      case 3:
        return ["var(--colors-status-error)", "Не указано"];
      default:
        return ["var(--colors-status-warning)", "Нет информации"];
    }
  })();

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
          onClick={onReturn}
        >
          <ChevronSvg width="20" className="rotate-180 mr-2" />
          <p className="text-xl">{toFullName(vm.selectedDoctor ?? {})}</p>
        </Button>
      </div>
      <div
        className={`${card} flex-wrap items-center gap-4`}
        style={{
          borderBottom: `4px solid ${color}`,
        }}
      >
        <div className="flex flex-col justify-center flex-1 gap-1">
          <h3 className="font-medium" style={{ color }}>
            {vm.selectedDoctor?.position}
          </h3>
          <h2 className="text-2xl font-bold">
            {toFullName(vm.selectedDoctor ?? {})}
          </h2>
        </div>
        <div
          className={`flex px-4 py-2 w-full h-[52px] md:w-auto justify-center items-center font-medium text-xl rounded-lg select-none`}
          style={{ backgroundColor, color }}
        >
          {text}
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
