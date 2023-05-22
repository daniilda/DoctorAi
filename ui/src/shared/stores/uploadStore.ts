import { makeAutoObservable } from "mobx";

interface ProcessedFile extends Omit<File, "arrayBuffer"> {
  arrayBuffer: ArrayBuffer;
  uri: string;
}

export const UploadStore = new (class {
  public files: File[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  addFiles = async (files: File[]) => {
    console.log(files);
    for (let i = 0; i < files.length; i++) {
      this.files.push({
        ...files[i],
        // arrayBuffer: buffer.slice(0), // slice to copy the buffer
        // uri: uri.toString(),
      });
    }
  };

  public pushFile(file: File) {
    console.log(this);
    this.files.push(file);
  }

  public removeFile(file: File) {
    this.files = this.files.filter((f) => f !== file);
  }

  public clearFiles() {
    this.files = [];
  }
})();
