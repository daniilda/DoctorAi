import { DocMeta, ReportEndpoint, ReportResult } from "@/api/endpoints";
import { makeAutoObservable } from "mobx";

export type SortOption =
  | "По алфавиту А-Я"
  | "По алфавиту Я-А"
  | "Сначала с соответствием"
  | "Сначала без соответствия";

export const ReportStore = new (class {
  public report: ReportResult | null = null;
  public selectedDoctor: DocMeta | null = null;
  public selectedSort: SortOption = "По алфавиту А-Я";
  constructor() {
    makeAutoObservable(this);
  }

  public dispose = () => {
    return;
  };

  public getReport = async (id: string) => {
    this.report = null;
    this.report = await ReportEndpoint.getReport(id);
  };
})();
