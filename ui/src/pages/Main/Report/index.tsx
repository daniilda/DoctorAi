import { useParams } from "react-router-dom";
import { observer } from "mobx-react-lite";
import ClockSvg from "./assets/clock.svg";
import { CSSTransition, SwitchTransition } from "react-transition-group";
import Overview from "./Overview";
import Doctor from "./Doctor";
import { ReportStore } from "@/stores/reportStore";
import { useEffect, useState } from "react";
import Patient from "./Patient";
import { Patient as PatientModel } from "@/api/endpoints";

/**
 * Refetch processing report every 10 seconds
 */
const REPORT_REFRESH_INTERVAL_MS = 10_000;

const Report = observer(() => {
  const { id } = useParams();
  const vm = ReportStore;
  const [animationClass, setAnimationClass] = useState<
    "slide-right" | "slide-left"
  >("slide-right");

  useEffect(() => {
    if (id && id !== vm.report?.id) {
      vm.getReport(id);
    }
    return () => {
      vm.selectedDoctor = null;
      vm.selectedPatient = null;
    };
  }, [id, vm]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (vm.report && !vm.report?.isReady) {
        vm.getReport(vm.report.id, false);
      }
    }, REPORT_REFRESH_INTERVAL_MS);

    return () => clearInterval(interval);
  }, [vm]);

  const onPatientSelect = (p: PatientModel) => {
    setAnimationClass("slide-left");
    setTimeout(() => {
      vm.selectedPatient = p;
    }, 10);
  };

  const onPatientReturn = () => {
    vm.selectedPatient = null;
    setTimeout(() => {
      setAnimationClass("slide-right");
    }, 300);
  };

  return (
    <main className="flex flex-col max-w-screen-max w-full px-4 lg:px-8 mt-4 md:mt-6 lg:mt-8 gap-3 pb-4">
      {vm.report && !vm.report.isReady && (
        <div className="select-none w-full p-8 rounded-xl bg-status-warning/10 flex flex-col gap-3 shadow-sm mb-2 flex-wrap">
          <div className="flex items-center flex-wrap gap-3">
            <ClockSvg className="text-status-warning w-10" />
            <h2 className="text-3xl font-medium text-status-warning">
              Отчёт еще составляется
            </h2>
          </div>
          <p className="text-text-secondary text-xl leading-6 whitespace-break-spaces">
            Страница автоматически обновится по завершению
          </p>
        </div>
      )}
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
        ) : vm.selectedPatient === null ? (
          <CSSTransition
            key="doctor"
            timeout={150}
            classNames={animationClass}
            unmountOnExit
          >
            <Doctor onPatientClick={onPatientSelect} />
          </CSSTransition>
        ) : (
          <CSSTransition
            key="patient"
            timeout={150}
            classNames="slide-right"
            unmountOnExit
          >
            <Patient onReturn={onPatientReturn} />
          </CSSTransition>
        )}
      </SwitchTransition>
    </main>
  );
});

export default Report;
