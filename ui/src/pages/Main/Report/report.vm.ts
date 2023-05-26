import { DocMeta, ReportEndpoint, ReportResult } from "@/api/endpoints";
import { makeAutoObservable } from "mobx";

export type SortOption =
  | "По алфавиту А-Я"
  | "По алфавиту Я-А"
  | "Сначала с соответствием"
  | "Сначала без соответствия";

export class ReportStore {
  public report: ReportResult | null = null;
  public selectedDoctor: DocMeta | null = null;
  public selectedSort: SortOption = "По алфавиту А-Я";
  constructor(id: string) {
    makeAutoObservable(this);
    this._init(id);
  }

  private async _init(id: string) {
    this.report = await ReportEndpoint.getReport(id);
  }

  public dispose = () => {
    return;
  };
}
