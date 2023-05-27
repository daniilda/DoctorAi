import api from "@/utils/api";

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
  pdfUrl: string;
  docxUrl: string;
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
  pdfUrl: string;
  docxUrl: string;
}

export interface ReportResult {
  id: string;
  reportName: string;
  createdAt: string;
  creatorId: string;
  isReady: boolean;
  reportDocs?: DocMeta[];
  pdfUrl: string;
  docxUrl: string;
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

export const ReportEndpoint = new (class {
  async getReport(id: string) {
    const result = await api.get(`/report/${id}`);
    console.log(result);
    return result as ReportResult;
  }

  async getReports() {
    return (await api.get(`/report/list`)) as ReportResult[];
  }

  async getDashboard() {
    return (await api.get("/report/dashboard")) as Dashboard;
  }
})();
