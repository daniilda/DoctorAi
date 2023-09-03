// Тайпскрипту очень плохо при работе с файлами, поэтому я его освобождаю
import { makeAutoObservable } from "mobx";
import { ReportEndpoint, UploadEndpoint } from "@/api/endpoints";
import { ReportStore } from "@/stores/reportStore";

export class UploadStore {
  public files: File[] = [];
  public title = "";
  public status: "idle" | "uploading" | "success" | "error" | "analyzing" =
    "idle";
  public progress = 0;
  public reportId: string | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  addFiles = (files: File[]) => {
    for (const file of files) {
      const extention = file.name.split(".").pop()?.toLowerCase();
      if (extention !== "docx" && extention !== "xlsx") return;
      this.files.push(file);
    }
    // this.files = [...this.files, ...files];
  };

  public removeFile(file: File) {
    this.files = this.files.filter((f: File) => f !== file);
  }

  public clearFiles() {
    this.files = [];
  }

  public async upload() {
    this.status = "uploading";
    const result = await UploadEndpoint.upload(
      this.files,
      this.title,
      (progress: number) => {
        this.progress = progress;
        if (progress === 100) {
          this.status === "analyzing";
        }
      }
    ).catch(() => {
      this.status = "error";
    });
    if (!result) return;

    this.reportId = result.id;
    const report = await ReportEndpoint.getReport(result.id);
    this.status = "success";
    ReportStore.report = report;
  }

  public dispose = () => {
    return;
  };
}
