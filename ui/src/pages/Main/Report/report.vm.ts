import { DocMeta, ReportEndpoint, ReportResult } from "../../../api/endpoints";
import { makeAutoObservable } from "mobx";

export class ReportStore {
  public report: ReportResult | null = null;
  public selectedDoctor: DocMeta | null = null;
  constructor(id: string) {
    makeAutoObservable(this);
    this._init(id);
  }

  private async _init(id: string) {
    this.report = await ReportEndpoint.load(id);
  }

  public dispose = () => {
    return;
  };
}
