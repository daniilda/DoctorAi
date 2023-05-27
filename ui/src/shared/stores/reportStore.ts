import { DocMeta, ReportEndpoint, ReportResult } from "@/api/endpoints";
import { makeAutoObservable } from "mobx";

export type SortOption =
  | "По алфавиту А-Я"
  | "По алфавиту Я-А"
  | "По специальности А-Я"
  | "По специальности Я-А"
  | "Сначала с соответствием"
  | "Сначала без соответствия";

export const ReportStore = new (class {
  public report: ReportResult | null = null;
  public selectedDoctor: DocMeta | null = null;
  public _selectedSort: SortOption = "По алфавиту А-Я";
  constructor() {
    makeAutoObservable(this);
  }

  public dispose = () => {
    return;
  };

  public getReport = async (id: string) => {
    this.report = null;
    this.report = await ReportEndpoint.getReport(id);
    this.selectedDoctor = null;
  };

  get selectedSort() {
    return this._selectedSort;
  }

  set selectedSort(value: SortOption) {
    this.sortItems(value);
    this._selectedSort = value;
  }

  private sortItems(value: SortOption) {
    if (!this.report) return [];
    switch (value) {
      case "По алфавиту А-Я":
        return this.report.docMetas.sort((a, b) =>
          a.lastName.localeCompare(b.lastName)
        );
      case "По алфавиту Я-А":
        return this.report.docMetas.sort((a, b) =>
          b.lastName.localeCompare(a.lastName)
        );
      case "Сначала с соответствием":
        return this.report.docMetas.sort((a, b) => {
          if (a.rate > b.rate) return -1;
          if (a.rate < b.rate) return 1;
          return 0;
        });
      case "Сначала без соответствия":
        return this.report.docMetas.sort((a, b) => {
          if (a.rate > b.rate) return 1;
          if (a.rate < b.rate) return -1;
          return 0;
        });
      case "По специальности А-Я":
        return this.report.docMetas.sort((a, b) =>
          a.position.localeCompare(b.position)
        );
      case "По специальности Я-А":
        return this.report.docMetas.sort((a, b) =>
          b.position.localeCompare(a.position)
        );
      default:
        return this.report.docMetas;
    }
  }
})();
