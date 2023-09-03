import api from "@/utils/api";
import { UserResult } from "./AuthEndpoint";
import { MOCK_DASHBOARD, MOCK_REPORTS } from "./mocks";

const IS_MOCK = import.meta.env.VITE_IS_MOCK === "true";

export interface Appointment {
  id: string;
  name: string;
  appointmentState: number;
}

export interface Patient {
  id: string;
  firstName: string;
  middleName: string;
  lastName: string;
  diagnosis: string;
  rate?: number;
  reportAppointments: Appointment[];
  pdfUrl: string | null;
  docxUrl: string | null;
}

export interface DocMeta {
  id: string;
  firstName: string;
  middleName: string;
  lastName: string;
  position: string;
  rate?: number;
  reportPatients: Patient[];
  division: string;
  pdfUrl: string | null;
  docxUrl: string | null;
}

export interface ReportResult {
  id: string;
  reportName: string;
  createdAt: string;
  creator: UserResult;
  isReady: boolean;
  reportDocs?: DocMeta[];
  pdfUrl: string | null;
  docxUrl: string | null;
}

export interface Dashboard {
  avgPerc: number;
  topDivisionName: string;
  topDivisionPerc: number;
  lastDivisionName: string;
  lastDivisionPerc: number;
  top1: string;
  top1Val: number;
  top2: string;
  top2Val: number;
  top3: string;
  top3Val: number;
}

export namespace ReportEndpoint {
  export const getReport = async (id: string): Promise<ReportResult | null> => {
    if (IS_MOCK) {
      if (id === "mock1") {
        const random = Math.random();
        // if (random < 0.5) {
        //   return MOCK_REPORT_PENDING;
        // }
      }
      return MOCK_REPORTS.find((report) => report.id === id) ?? null;
    }
    const result = await api.get(`/report/${id}`);
    return result as ReportResult;
  };

  export const getReports = async (): Promise<ReportResult[]> => {
    if (IS_MOCK) {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      return MOCK_REPORTS;
    }
    return (await api.get(`/report/list`)) as ReportResult[];
  };

  export const getDashboard = async (): Promise<Dashboard> => {
    if (IS_MOCK) {
      await new Promise((resolve) => setTimeout(resolve, 1500));

      return MOCK_DASHBOARD;
    }
    return (await api.get("/report/dashboard")) as Dashboard;
  };
}
