import { observer } from "mobx-react-lite";
import ChevronSvg from "@/assets/chevron.svg";
import { card, cardWithHover } from "./tailwind";
import toFullName from "@/utils/toFullName";
import useRating from "@/utils/useRating";
import { Patient } from "@/api/endpoints";
import Download from "@/components/Download";
import { useEffect } from "react";
import { ReportStore } from "@/stores/reportStore";
import cl from "./styles.module.scss";

const pluralForms = {
  one: 'заключение',
  few: 'заключения',
  many: 'заключений'
};

function pluralize(count: number) {
  let form: keyof typeof pluralForms;
  if (count % 10 === 1 && count % 100 !== 11) {
    form = 'one';
  } else if (
    count % 10 >= 2 &&
    count % 10 <= 4 &&
    (count % 100 < 10 || count % 100 >= 20)
  ) {
    form = 'few';
  } else {
    form = 'many';
  }
  return `${count} ${pluralForms[form]}`;
}

const PatientCard = ({ p, onClick }: { p: Patient; onClick: () => void }) => (
  <div
    className={`${cardWithHover} ${cl.card} items-center justify-between gap-4 select-none`}
    onClick={onClick}
  >
    <div className="flex flex-col gap-1">
      <h2 className="text-2xl font-bold">{toFullName(p)}</h2>
      <p className="text-primary text-lg">
        {pluralize(p.reportAppointments.length)}
      </p>
    </div>
    <div className="flex items-center">
      <ChevronSvg className={cl.card__chevron} />
    </div>
  </div>
);

const Doctor = observer(
  ({ onPatientClick }: { onPatientClick: (p: Patient) => void }) => {
    const vm = ReportStore;
    const { text, color, backgroundColor } = useRating(vm.selectedDoctor?.rate);

    useEffect(() => {
      window.scrollTo(0, 0);
    }, []);

    return (
      <div className="grid gap-3 w-full">
        <div className="flex flex-col gap-3 md:mb-2">
          <div className="flex cursor-pointer items-center gap-2 select-none">
            <div
              className="flex gap-2 text-text-secondary hover:text-text-main"
              onClick={() => (vm.selectedDoctor = null)}
            >
              <ChevronSvg width="20" className="rotate-180" />
              <p className="text-2xl">{vm.report?.reportName}</p>
            </div>
          </div>
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
              {vm.selectedDoctor ? toFullName(vm.selectedDoctor) : ""}
            </h2>
          </div>
          <div
            className={`flex px-4 py-2 w-full h-[52px] md:w-auto justify-center items-center font-medium text-xl rounded-lg select-none`}
            style={{ backgroundColor, color }}
          >
            {text}
          </div>
          <Download
            pdf={vm.selectedDoctor?.pdfUrl}
            docx={vm.selectedDoctor?.docxUrl}
          />
        </div>
        {vm.selectedDoctor?.reportPatients.map((p) => (
          <PatientCard key={p.id} p={p} onClick={() => onPatientClick(p)} />
        ))}
      </div>
    );
  }
);

export default Doctor;
