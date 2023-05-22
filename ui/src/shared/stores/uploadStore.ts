// Тайпскрипту очень плохо при работе с файлами, поэтому я его освобождаю
import { makeAutoObservable } from "mobx";

export const UploadStore = new (class {
  public files: any = [];
  public title = "";

  constructor() {
    makeAutoObservable(this);
    console.log("init");
  }

  addFiles = (files: any) => {
    for (let i = 0; i < files.length; i++) {
      files[i].progress = 0;
      this.files.push(files[i]);
    }
    // this.files = [...this.files, ...files];
  };

  public removeFile(file: any) {
    this.files = this.files.filter((f: any) => f !== file);
  }

  public clearFiles() {
    this.files = [];
  }
})();
