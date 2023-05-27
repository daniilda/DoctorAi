import { useParams } from "react-router-dom";
import { observer } from "mobx-react-lite";

import { CSSTransition, SwitchTransition } from "react-transition-group";
import Overview from "./Overview";
import Doctor from "./Doctor";
import { ReportStore } from "@/stores/reportStore";
import { useEffect } from "react";

const Report = observer(() => {
  const { id } = useParams();
  const vm = ReportStore;

  useEffect(() => {
    if (id && id !== vm.report?.id) {
      vm.getReport(id);
    }
    return () => {
      vm.selectedDoctor = null;
    };
  }, []);

  return (
    <div className="flex flex-col max-w-screen-max w-full px-4 lg:px-8 mt-4 md:mt-6 lg:mt-8 gap-3 appear pb-4">
      <SwitchTransition>
        {vm.selectedDoctor === null ? (
          <CSSTransition
            key="report"
            timeout={150}
            classNames="slide-left"
            unmountOnExit
          >
            <Overview />
          </CSSTransition>
        ) : (
          <CSSTransition
            key="doctor"
            timeout={150}
            classNames="slide-right"
            unmountOnExit
          >
            <Doctor />
          </CSSTransition>
        )}
      </SwitchTransition>
    </div>
  );
});

export default Report;
