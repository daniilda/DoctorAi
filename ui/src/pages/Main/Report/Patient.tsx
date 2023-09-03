import { observer } from "mobx-react-lite";
import ChevronSvg from "@/assets/chevron.svg";
import { card } from "./tailwind";
import toFullName from "@/utils/toFullName";
import { Appointment } from "@/api/endpoints";
import Download from "@/components/Download";
import {
  CSSProperties,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { ReportStore } from "@/stores/reportStore";
import cl from "./styles.module.scss";
import { CSSTransition, TransitionGroup } from "react-transition-group";

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
    <div className={`${card} items-center justify-between gap-4 flex-wrap`}>
      <div className="flex flex-col gap-1 sm:flex-1">
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

const SortCard = ({
  topText,
  middleText,
  color,
  selected,
  onSelect,
}: {
  topText?: string;
  middleText?: string;
  color: string;
  selected: boolean;
  onSelect: () => void;
}) => {
  return (
    <div
      className={`${cl.hover_card} transition-colors cursor-pointer bg-bg-accent rounded-xl gap-2 flex-wrap justify-between shadow-sm flex w-full select-none
      px-8 py-2 sm:p-4 md:px-8 md:py-6 items-center sm:items-start flex-row sm:flex-col md:flex-row`}
      style={
        {
          "--hover-color": `rgba(${color}, 0.1)`,
          backgroundColor: selected ? `rgba(${color}, 0.2)` : "",
        } as CSSProperties
      }
      onClick={onSelect}
    >
      <h3 className="text-2xl">{topText}</h3>
      <h1 className="text-3xl font-bold" style={{ color: `rgb(${color})` }}>
        {middleText}
      </h1>
    </div>
  );
};

const Patient = observer(({ onReturn }: { onReturn: () => void }) => {
  const vm = ReportStore;
  const [sort, setSort] = useState<("correct" | "incorrect" | "extra")[]>([]);

  const [patientColor, patientText] = useMemo(
    () =>
      vm.selectedPatient?.reportAppointments.some(
        (v) => v.appointmentState !== 1
      )
        ? ["var(--colors-status-warning)", "Есть замечания"]
        : ["var(--colors-status-ok)", "Верные указания"],
    [vm.selectedPatient]
  );

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const updateSort = useCallback(
    (sort: "correct" | "incorrect" | "extra") =>
      setSort((prev) =>
        prev.includes(sort) ? prev.filter((v) => v !== sort) : [...prev, sort]
      ),
    [setSort]
  );

  return (
    <div className="grid gap-3 w-full">
      <div className="flex flex-col gap-3 md:mb-2">
        <div className="flex flex-wrap items-center gap-4 select-none">
          <div
            className="gap-2 text-text-secondary hover:text-text-main cursor-pointer hidden md:flex"
            onClick={() => {
              onReturn();
              vm.selectedDoctor = null;
            }}
          >
            <ChevronSvg width="20" className="rotate-180" />
            <p className="text-2xl">{vm.report?.reportName}</p>
          </div>
          <div
            className="gap-2 text-text-secondary hover:text-text-main cursor-pointer flex"
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
          {vm.selectedPatient?.diagnosis && (
            <h3 style={{ color: `rgb(${patientColor})` }}>
              {vm.selectedPatient.diagnosis}
            </h3>
          )}
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
      <div className="grid sm:grid-cols-3 gap-2">
        <SortCard
          topText="Верных"
          middleText={vm.selectedPatient?.reportAppointments
            .filter((v) => v.appointmentState === 1)
            .length.toString()}
          color="var(--colors-status-ok)"
          onSelect={() => updateSort("correct")}
          selected={sort.includes("correct")}
        />
        <SortCard
          topText="Лишних"
          middleText={vm.selectedPatient?.reportAppointments
            .filter((v) => v.appointmentState !== 1 && v.appointmentState !== 3)
            .length.toString()}
          color="var(--colors-status-warning)"
          onSelect={() => updateSort("extra")}
          selected={sort.includes("extra")}
        />
        <SortCard
          topText="Неверных"
          middleText={vm.selectedPatient?.reportAppointments
            .filter((v) => v.appointmentState === 3)
            .length.toString()}
          color="var(--colors-status-error)"
          onSelect={() => updateSort("incorrect")}
          selected={sort.includes("incorrect")}
        />
      </div>
      <TransitionGroup component={null}>
        {vm.selectedPatient?.reportAppointments
          .filter((v) => {
            if (sort.length === 0) return true;
            if (v.appointmentState === 1) return sort.includes("correct");
            if (v.appointmentState === 3) return sort.includes("incorrect");
            return sort.includes("extra");
          })
          .map((v) => (
            <CSSTransition
              key={v.name}
              timeout={150}
              classNames="fade"
              unmountOnExit
            >
              <AppointmentCard {...v} />
            </CSSTransition>
          ))}
      </TransitionGroup>
    </div>
  );
});

export default Patient;
