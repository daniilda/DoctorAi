import Logo from "@/assets/logo.svg";
import DragDropFile from "./components/DragDropFile";
import { observer } from "mobx-react-lite";
import { UploadStore } from "./upload.vm";
import Preview from "./components/Preview";
import { useViewModel } from "@/utils/useViewModel";

const UploadPage = observer(() => {
  const vm = useViewModel(() => new UploadStore());
  return (
    <main className="flex flex-col items-center min-h-full">
      <Logo className="max-w-md mt-20" />
      <p className="text-center max-w-md mt-4">
        Сервис поможет оценить релевантность назначений специалиста на основе
        данных из медицинской карточки пациента
      </p>
      <div className="flex flex-col mt-16 w-full max-w-lg items-center">
        <DragDropFile onUpload={vm.addFiles} />
      </div>
      <p className="text-center mt-6 mb-8">поддерживются форматы docx и xlsx</p>
      <Preview vm={vm} />
    </main>
  );
});

export default UploadPage;
