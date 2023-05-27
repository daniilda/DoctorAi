import { Dashboard, ReportEndpoint, ReportResult } from "@/api/endpoints";
import { makeAutoObservable, toJS } from "mobx";

export class DashboardStore {
  public reports: ReportResult[] = [];
  public dashboard: Dashboard | null = null;

  constructor() {
    makeAutoObservable(this);
    this._init();
  }

  private async _init() {
    this.reports = await ReportEndpoint.getReports();
    this.dashboard = await ReportEndpoint.getDashboard();
  }

  public dispose = () => {
    return;
  };
}
