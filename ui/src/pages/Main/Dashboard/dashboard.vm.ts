import { ReportEndpoint, ReportResult } from "@/api/endpoints";
import { makeAutoObservable, toJS } from "mobx";

export class DashboardStore {
  public reports: ReportResult[] = [];

  constructor() {
    makeAutoObservable(this);
    this._init();
  }

  private async _init() {
    this.reports = await ReportEndpoint.getReports();
  }

  public dispose = () => {
    return;
  };
}
