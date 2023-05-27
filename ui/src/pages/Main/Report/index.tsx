import { useParams } from "react-router-dom";
import { observer } from "mobx-react-lite";

import { CSSTransition, SwitchTransition } from "react-transition-group";
import Overview from "./Overview";
import Doctor from "./Doctor";
import { ReportStore } from "@/stores/reportStore";
import { useEffect, useState } from "react";
import Patient from "./Patient";
import { Patient as PatientModel } from "@/api/endpoints";

const Report = observer(() => {
  const { id } = useParams();
  const vm = ReportStore;
  const [doctorClass, setDoctorClass] = useState("slide-right");

  useEffect(() => {
    if (id && id !== vm.report?.id) {
      vm.getReport(id);
    }
    return () => {
      vm.selectedDoctor = null;
    };
  }, []);

  const onPatientSelect = (p: PatientModel) => {
    setDoctorClass("slide-left");
    setTimeout(() => {
      vm.selectedPatient = p;
    }, 10);
  };

  const onPatientReturn = () => {
    vm.selectedPatient = null;
    setTimeout(() => {
      setDoctorClass("slide-right");
    }, 300);
  };

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
        ) : vm.selectedPatient === null ? (
          <CSSTransition
            key="doctor"
            timeout={150}
            classNames={doctorClass}
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
    </div>
  );
});

export default Report;
