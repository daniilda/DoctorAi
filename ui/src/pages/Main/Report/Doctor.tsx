import { observer } from "mobx-react-lite";
import ChevronSvg from "@/assets/chevron.svg";
import { ReportStore } from "./report.vm";
import { Button } from "@/components/ui";
import { card } from "./tailwind";
import toFullName from "@/utils/toFullName";
import useRating from "@/utils/useRating";
import { Patient } from "@/api/endpoints";
import Download from "@/components/Download";

const PatientCard = (p: Patient) => {
  return (
    <div className={`${card} flex-wrap items-center justify-between gap-4`}>
      <div className="flex flex-col gap-1">
        <p className="text-primary">Пациент</p>
        <h2 className="text-2xl font-bold">{toFullName(p)}</h2>
      </div>
    </div>
  );
};

const Doctor = observer(({ vm }: { vm: ReportStore }) => {
  if (!vm.selectedDoctor) return <></>;
  const [ratingTextColor, ratingBgColor, ratingText] = useRating(
    vm.selectedDoctor.rate
  );

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
          <p className="text-2xl">Отчёт</p>
        </Button>
      </div>
      <div
        className={`${card} flex-wrap items-center gap-4 border-b-4 border-b-${ratingTextColor}`}
      >
        <div className="flex flex-col justify-center flex-1 gap-1">
          <h3 className={`text-${ratingTextColor}`}>
            {vm.selectedDoctor.position}
          </h3>
          <h2 className="text-2xl font-bold">
            {toFullName(vm.selectedDoctor)}
          </h2>
        </div>
        <div
          className={`flex px-4 py-2 w-full h-[52px] md:w-auto justify-center items-center font-medium text-xl rounded-lg bg-${ratingBgColor} text-${ratingTextColor}`}
        >
          {ratingText}
        </div>
        <Download />
      </div>
      {vm.selectedDoctor.patients.map((p) => (
        <PatientCard {...p} />
      ))}
    </div>
  );
});

export default Doctor;
