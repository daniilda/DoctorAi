import Logo from "@/assets/logo.svg";
import DragDropFile from "./components/DragDropFile";

const SubmitPage = () => {
  return (
    <main className="flex flex-col items-center">
      <Logo className="max-w-md mt-20" />
      <p className="text-center max-w-md mt-4">
        Сервис поможет оценить релевантность назначений специалиста на основе
        данных из медицинской карточки пациента
      </p>
      <div className="flex flex-col mt-16 w-full max-w-lg items-center">
        <DragDropFile />
      </div>
    </main>
  );
};

export default SubmitPage;
