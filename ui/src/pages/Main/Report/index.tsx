import { useViewModel } from "@/utils/useViewModel";
import { useParams } from "react-router-dom";
import { ReportStore } from "./report.vm";
import { observer } from "mobx-react-lite";

import { CSSTransition, SwitchTransition } from "react-transition-group";
import Overview from "./Overview";
import Doctor from "./Doctor";

const Report = observer(() => {
  const { id } = useParams();
  const vm = useViewModel(() => new ReportStore(id ?? ""));
  return (
    <div className="flex flex-col max-w-screen-max w-full px-4 lg:px-8 mt-6 lg:mt-8 gap-3 appear pb-4">
      <SwitchTransition>
        {vm.selectedDoctor === null ? (
          <CSSTransition
            key="report"
            timeout={150}
            classNames="slide-left"
            unmountOnExit
          >
            <Overview vm={vm} />
          </CSSTransition>
        ) : (
          <CSSTransition
            key="doctor"
            timeout={150}
            classNames="slide-right"
            unmountOnExit
          >
            <Doctor vm={vm} />
          </CSSTransition>
        )}
      </SwitchTransition>
    </div>
  );
});

export default Report;
