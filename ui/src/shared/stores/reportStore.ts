import {
  DocMeta,
  Patient,
  ReportEndpoint,
  ReportResult,
} from "@/api/endpoints";
import { makeAutoObservable } from "mobx";

export type SortOption = "По алфавиту" | "По специальности" | "По соответствию";

export const ReportStore = new (class {
  public report: ReportResult | null = null;
  public selectedDoctor: DocMeta | null = null;
  public selectedPatient: Patient | null = null;
  private _reverseOrder = false;
  private _selectedSort: SortOption = "По алфавиту";
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
    this.sortItems(this.selectedSort, this.reverseOrder);
    console.log(this.report);
  };

  get selectedSort() {
    return this._selectedSort;
  }

  set selectedSort(value: SortOption) {
    this.sortItems(value, this.reverseOrder);
    this._selectedSort = value;
  }

  get reverseOrder() {
    return this._reverseOrder;
  }

  set reverseOrder(value: boolean) {
    this.sortItems(this.selectedSort, value);
    this._reverseOrder = value;
  }

  private sortItems(value: SortOption, reverse: boolean) {
    if (!this.report || !this.report.docMetas) return [];
    switch (value) {
      case "По алфавиту":
        this.report.docMetas.sort((a, b) => {
          if (a.lastName > b.lastName) return 1;
          else if (a.lastName < b.lastName) return -1;
          return 0;
        });
        break;
      case "По специальности":
        this.report.docMetas.sort((a, b) => {
          if (a.position > b.position) return 1;
          else if (a.position < b.position) return -1;
          return 0;
        });
        break;
      case "По соответствию":
        this.report.docMetas.sort((a, b) => {
          if (a.rate < b.rate) return 1;
          else if (a.rate > b.rate) return -1;
          return 0;
        });
        break;
    }
    if (reverse) this.report.docMetas.reverse();
  }
})();
