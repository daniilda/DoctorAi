import Logo from "@/assets/logo.svg";
import DragDropFile from "./components/DragDropFile";
import { observer } from "mobx-react-lite";
import { UploadStore } from "./upload.vm";
import Preview from "./components/Preview";
import { useViewModel } from "@/utils/useViewModel";
import { CSSTransition, SwitchTransition } from "react-transition-group";
import ProgressBar from "./components/ProgressBar";
import { Checkmark } from "@/components/ui";

const UploadPage = observer(() => {
  const vm = useViewModel(() => new UploadStore());
  return (
    <main className="flex flex-col items-center min-h-full">
      <Logo className="max-w-md mt-20" />
      <SwitchTransition>
        {vm.status === "uploading" ? (
          <CSSTransition
            key="uploading"
            timeout={300}
            classNames="appear"
            unmountOnExit
          >
            <div className="flex flex-col items-center w-full max-w-md">
              <p className="text-center max-w-md mt-4 mb-12">
                Результаты анализа будут совсем скоро — обработка может занять
                несколько минут
              </p>
              <ProgressBar value={vm.progress} />
            </div>
          </CSSTransition>
        ) : vm.status !== "success" ? (
          <CSSTransition
            key="idle"
            timeout={300}
            classNames="appear"
            unmountOnExit
          >
            <Checkmark color="rgb(var(--colors-status-ok))" />
          </CSSTransition>
        ) : (
          <CSSTransition
            key="idle"
            timeout={300}
            classNames="appear"
            unmountOnExit
          >
            <div className="flex flex-col">
              <p className="text-center max-w-md mt-4">
                Сервис поможет оценить релевантность назначений специалиста на
                основе данных из медицинской карточки пациента
              </p>
              <div className="flex flex-col mt-16 w-full max-w-lg items-center">
                <DragDropFile onUpload={vm.addFiles} />
              </div>
              <p className="text-center text-text-placeholder mt-6 mb-8">
                поддерживются форматы docx и xlsx
              </p>
            </div>
          </CSSTransition>
        )}
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
