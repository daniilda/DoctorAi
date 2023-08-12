import { Dashboard, ReportEndpoint, ReportResult } from "@/api/endpoints";
import { makeAutoObservable } from "mobx";

export const DashboardStore = new (class {
  public reports: ReportResult[] = [];
  public dashboard: Dashboard | null = null;
  public wasLoaded = false;

  constructor() {
    makeAutoObservable(this);
    this._init();
  }

  private async _init() {
    this.reports = await ReportEndpoint.getReports();
    this.dashboard = await ReportEndpoint.getDashboard();
    this.wasLoaded = true;
  }

  public async updateDashboard() {
    this.reports = await ReportEndpoint.getReports();
    this.dashboard = await ReportEndpoint.getDashboard();
  }
})();
