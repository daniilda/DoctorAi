import React from "react";
import { useState } from "react";

const DragDropFile = ({ onUpload }: { onUpload: (files: File[]) => void }) => {
  const [drag, setDrag] = useState(false);

  const onDragStart = (e: React.DragEvent<HTMLFormElement>) => {
    e.preventDefault();
    setDrag(true);
  };

  const onDragLeave = (e: React.DragEvent<HTMLFormElement>) => {
    e.preventDefault();
    setDrag(false);
  };

  const onDrop = (e: React.DragEvent<HTMLFormElement>) => {
    e.preventDefault();
    const files = [...e.dataTransfer.files];
    onUpload(files);
    setDrag(false);
  };

  const onFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const files = [...e.target.files];
    onUpload(files);
    e.target.value = "";
  };

  return (
    <form
      className="w-full"
      onDragStart={(e) => onDragStart(e)}
      onDragLeave={(e) => onDragLeave(e)}
      onDragOver={(e) => onDragStart(e)}
      onDrop={(e) => onDrop(e)}
    >
      <input
        className="hidden"
        id="file"
        type="file"
        accept=".docx, .xlsx"
        multiple
        onChange={(e) => onFileUpload(e)}
      />
      <div
        className="select-none font-medium text-center text-lg lg:text-2xl transition-colors hover:bg-primaryLighter bg-primary w-full text-text-onPrimary rounded-lg hover:shadow-md"
        style={{
          border: drag ? "2px dashed gray" : "2px dashed transparent",
        }}
      >
        <label
          className="py-4 justify-center w-full cursor-pointer px-6 flex"
          htmlFor="file"
        >
          Выберите или перетащите файлы
        </label>
      </div>
    </form>
  );
};

export default DragDropFile;
