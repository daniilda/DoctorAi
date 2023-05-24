import { UploadStore } from "@/stores";
import { observer } from "mobx-react-lite";
import cl from "./styles.module.scss";
import { Input } from "@/components/ui";
import ExcelSvg from "@/assets/filetypes/excel.svg";
import WordSvg from "@/assets/filetypes/word.svg";
import TrashSvg from "@/assets/trash.svg";
import { toJS } from "mobx";

const Preview: React.FC = observer(() => {
  if (UploadStore.files.length === 0) {
    return <></>;
  }
  console.log(toJS(UploadStore.files));
  const card = "bg-bg-accent max-w-2xl rounded-xl p-6 flex flex-col shadow-sm";
  return (
    <div
      className={`${cl.slide_in} w-full h-full mx-auto max-w-2xl flex flex-col gap-6`}
    >
      <div className={card}>
        <h2 className="font-medium text-xl">Название отчёта</h2>
        <Input
          value={UploadStore.title}
          onChange={(v) => (UploadStore.title = v)}
          className="mt-2 text-xl !rounded-lg"
          appearance="primary"
          placeholder="Введите название"
          allowClear
        />
      </div>
      <div className={card}>
        <h2 className="font-medium text-xl">Выбранные файлы</h2>
        <div className="flex flex-col">
          {UploadStore.files.map((file, index) => (
            <div
              key={index}
              className="flex items-center mt-2 bg-bg-primary rounded-lg p-2 px-3"
            >
              {file.type ===
              "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ? (
                <WordSvg className="w-8 h-8 mr-2" />
              ) : (
                <ExcelSvg className="w-8 h-8 mr-2" />
              )}
              <div className="flex flex-col">
                <p className="text-base">{file.name}</p>
                <p className="text-text-placeholder">
                  {Math.round(file.size / 1024) + " КБайт"}
                </p>
              </div>

              <button
                className="ml-auto focus:outline-none"
                onClick={() => UploadStore.removeFile(file)}
              >
                <TrashSvg className="text-gray-500/50 hover:text-gray-500/80" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
});

export default Preview;
