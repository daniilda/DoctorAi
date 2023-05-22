import { makeAutoObservable } from "mobx";

interface ProcessedFile extends Omit<File, "arrayBuffer"> {
  arrayBuffer: ArrayBuffer;
  uri: string;
}

export const UploadStore = new (class {
  public files: ProcessedFile[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  addFiles = async (files: File[]) => {
    console.log(files);
    const reader = new FileReader();
    for (let i = 0; i < files.length; i++) {
      reader.readAsDataURL(files[i]);
      reader.onload = async (v) => {
        console.log(v);
        const fileCopy = { ...files[i] };
        const buffer = await files[i].arrayBuffer();
        const uri = URL.createObjectURL(files[i]);
        this.files.push({
          ...fileCopy,
          arrayBuffer: buffer.slice(0), // slice to copy the buffer
          uri: uri.toString(),
        });
      };
    }
  };

  public pushFile(file: ProcessedFile) {
    console.log(this);
    this.files.push(file);
  }

  public removeFile(file: ProcessedFile) {
    this.files = this.files.filter((f) => f !== file);
  }

  public clearFiles() {
    this.files = [];
  }
})();
