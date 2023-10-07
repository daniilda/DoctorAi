import Logo from "@/assets/logo.svg";
import DragDropFile from "./components/DragDropFile";
import { observer } from "mobx-react-lite";
import { UploadStore } from "./upload.vm";
import Preview from "./components/Preview";
import { useViewModel } from "@/utils/useViewModel";
import { CSSTransition, SwitchTransition } from "react-transition-group";
import ProgressBar from "./components/ProgressBar";
import { Checkmark } from "@/components/ui";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const UploadPage = observer(() => {
  const vm = useViewModel(() => new UploadStore());
  const [navigating, setNavigating] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (vm.status === "success") {
      setTimeout(() => {
        setNavigating(true);
      }, 2200);
      setTimeout(async () => {
        navigate(`/report/${vm.reportId}`);
      }, 2500);
    }
  }, [vm.status, navigate, vm.reportId]);

  return (
    <main
      className={`appear flex flex-col items-center w-full px-6 pb-6 min-h-full ${
        navigating ? "appear-exit-active" : ""
      }`}
    >
      <Logo className="sm:max-w-md mt-8 md:mt-20 w-full" />
      <SwitchTransition>
        <CSSTransition
          key="uploading"
          timeout={300}
          classNames="appear"
          unmountOnExit
        >
          {vm.status === "uploading" || vm.status === "analyzing" ? (
            <div className="flex flex-col items-center w-full max-w-md">
              <p className="text-center max-w-md mt-4 mb-12">
                Результаты анализа будут совсем скоро — обработка может занять
                несколько минут
              </p>
              <ProgressBar value={vm.progress} />
            </div>
          ) : vm.status === "success" ? (
            <div className="flex flex-col items-center mt-8 gap-6 font-medium text-2xl">
              <h2>Файлы успешно загружены!</h2>
              <Checkmark color="rgb(var(--colors-status-ok))" size={64} />
            </div>
          ) : vm.status === "error" ? (
            <div className="flex flex-col w-full items-center mt-8 gap-6">
              <h2 className="font-medium text-2xl">
                Ошибка: указан невереный файл
              </h2>
              <ProgressBar value={vm.progress} error />
            </div>
          ) : (
            <div className="flex flex-col">
              <p className="text-center max-w-md mt-4 select-none">
                Сервис поможет оценить релевантность назначений специалиста на
                основе данных из медицинской карточки пациента
              </p>
              <div className="flex flex-col mt-16 w-full max-w-lg items-center">
                <DragDropFile onUpload={vm.addFiles} />
              </div>
              <p className="text-center text-text-placeholder mt-4 mb-8 select-none">
                поддерживаются форматы docx и xlsx
              </p>
            </div>
          )}
        </CSSTransition>
      </SwitchTransition>
      <CSSTransition
        in={vm.files.length > 0 && vm.status === "idle"}
        timeout={300}
        classNames="slide-up"
        unmountOnExit
      >
        <Preview vm={vm} />
      </CSSTransition>
    </main>
  );
});

export default UploadPage;
