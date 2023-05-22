import { UploadStore } from "@/stores";
import { observer } from "mobx-react-lite";
import cl from "./styles.module.scss";
import { Input } from "@/components/ui";
import ExcelSvg from "@/assets/filetypes/excel.svg";
import WordSvg from "@/assets/filetypes/word.svg";
import TrashSvg from "@/assets/trash.svg";
import { toJS } from "mobx";

const Preview: React.FC = observer(() => {
  // if (UploadStore.files.length === 0) {
  //   return <></>;
  // }
  console.log(toJS(UploadStore.files));
  return (
    <div
      className={`w-full bg-bg-accent max-w-2xl rounded-xl p-6 flex flex-col ${cl.slide_in}`}
    >
      <h2 className="font-medium text-xl">Название отчёта</h2>
      <Input
        value={UploadStore.title}
        onChange={(v) => (UploadStore.title = v)}
        className="mt-2 text-xl !rounded-lg"
        appearance="primary"
        placeholder="Введите название"
        allowClear
      />
      <h2 className="font-medium text-xl mt-6">Выбранные файлы</h2>
      <div className="flex flex-col">
        {UploadStore.files.map((file, index) => (
          <div
            key={index}
            className="flex items-center mt-2 bg-bg-primary rounded-xl p-2"
          >
            {file.type ===
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ? (
              <WordSvg className="w-6 h-6 mr-2" />
            ) : (
              <ExcelSvg className="w-6 h-6 mr-2" />
            )}
            <p className="text-base">{file.name}</p>

            <button
              className="ml-auto focus:outline-none"
              onClick={() => UploadStore.removeFile(file)}
            >
              <TrashSvg />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
});

export default Preview;
