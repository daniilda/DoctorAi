// Тайпскрипту очень плохо при работе с файлами, поэтому я его освобождаю
import { makeAutoObservable } from "mobx";
import { ReportEndpoint, UploadEndpoint } from "@/api/endpoints";
import { GlobalReportStore } from "@/stores/globalReportStore";

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
    for (let i = 0; i < files.length; i++) {
      const extention = files[i].name.split(".").pop()?.toLowerCase();
      if (extention !== "docx" && extention !== "xlsx") return;
      this.files.push(files[i]);
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
    if (result) {
      this.reportId = result.id;
      this.status = "success";
      const report = await ReportEndpoint.getReport(result.id);
      GlobalReportStore.report = report;
    }
  }

  public dispose = () => {
    return;
  };
}
