// Тайпскрипту очень плохо при работе с файлами, поэтому я его освобождаю
import { makeAutoObservable } from "mobx";
import { UploadEndpoint } from "../../../api/endpoints";

export class UploadStore {
  public files: any = [];
  public title = "";

  constructor() {
    makeAutoObservable(this);
  }

  addFiles = (files: any) => {
    for (let i = 0; i < files.length; i++) {
      const extention = files[i].name.split(".").pop()?.toLocaleLowerCase();
      if (extention !== "docx" && extention !== "xlsx") return;
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

  public async upload() {
    return await UploadEndpoint.upload(this.files, this.title);
  }

  public dispose = () => {};
}
