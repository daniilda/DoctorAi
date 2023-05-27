import { UploadStore } from "../../upload.vm";
import { observer } from "mobx-react-lite";
import { Button, Input } from "@/components/ui";
import ExcelSvg from "@/assets/filetypes/excel.svg";
import WordSvg from "@/assets/filetypes/word.svg";
import TrashSvg from "@/assets/trash.svg";
import { useState } from "react";

interface PreviewProps {
  vm: UploadStore;
}

const Preview: React.FC<PreviewProps> = observer(({ vm }) => {
  const [error, setError] = useState(false);
  const card =
    "w-full bg-bg-accent max-w-2xl rounded-xl p-6 flex flex-col shadow-sm";

  return (
    <div
      className={`w-full mx-auto max-w-2xl flex flex-col items-center gap-4`}
    >
      <div className={card}>
        <h2 className="font-medium text-xl select-none">Название отчёта</h2>
        <Input
          error={error && !vm.title}
          value={vm.title}
          onChange={(v) => (vm.title = v)}
          className="mt-2 text-xl !rounded-lg"
          appearance="primary"
          placeholder="Введите название"
          allowClear
        />
      </div>
      <div className={card}>
        <h2 className="font-medium text-xl select-none">Выбранные файлы</h2>
        <div className="flex flex-col">
          {vm.files.map((file, index) => (
            <div
              key={index}
              className="flex items-center mt-2 bg-bg-primary rounded-lg p-2 px-3 shadow-sm"
            >
              {file.type ===
              "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ? (
                <WordSvg className="h-full mr-2" />
              ) : (
                <ExcelSvg className="h-full mr-2" />
              )}
              <div className="flex flex-col flex-1">
                <p className="text-base">{file.name}</p>
                <p className="text-text-placeholder">
                  {Math.round(file.size / 1024) + " КБайт"}
                </p>
              </div>

              <button
                className="focus:outline-none"
                onClick={() => vm.removeFile(file)}
              >
                <TrashSvg className="text-gray-500/50 hover:text-gray-500/80" />
              </button>
            </div>
          ))}
        </div>
      </div>
      <Button
        className="w-full lg:max-w-xs"
        onClick={() => {
          if (vm.title.length === 0) {
            setError(true);
            return;
          }
          setError(false);
          vm.upload();
        }}
      >
        Создать отчёт
      </Button>
    </div>
  );
});

export default Preview;
