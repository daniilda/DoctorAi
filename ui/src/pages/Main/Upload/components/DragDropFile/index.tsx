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
  };

  return (
    <form
      onDragStart={(e) => onDragStart(e)}
      onDragLeave={(e) => onDragLeave(e)}
      onDragOver={(e) => onDragStart(e)}
      onDrop={(e) => onDrop(e)}
    >
      {/* Allowed files: pdf, docx, doc */}
      <input
        className="hidden"
        id="file"
        type="file"
        accept=".pdf, .docx, .doc"
        multiple
        onChange={(e) => onFileUpload(e)}
      />
      <label
        className="font-bold bg-primary text-text-onPrimary text-2xl py-4 px-8 rounded-lg cursor-pointer"
        htmlFor="file"
      >
        Выбрать PDF или XLS файлы
      </label>
    </form>
  );
};

export default DragDropFile;
