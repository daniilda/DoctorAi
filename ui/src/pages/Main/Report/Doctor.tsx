import { observer } from "mobx-react-lite";
import ChevronSvg from "@/assets/chevron.svg";
import { ReportStore } from "./report.vm";
import { Button } from "@/components/ui";

const Doctor = observer(({ vm }: { vm: ReportStore }) => {
  return (
    <div className="flex flex-col gap-3">
      <Button
        appearance="secondary"
        className="flex items-center pl-4"
        onClick={() => (vm.selectedDoctor = null)}
      >
        <ChevronSvg width="20" className="rotate-180 mr-2" />
        Назад
      </Button>
    </div>
  );
});

export default Doctor;
