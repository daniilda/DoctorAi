import api from "@/utils/api";

export interface DocMeta {
  id: string;
  firstName: string;
  middleName: string;
  lastName: string;
  position: string;
  rate: number;
  reportId: string;
  patients: {
    id: string;
    firstName: string;
    middleName: string;
    lastName: string;
    diagnosis: string;
  }[];
}

export interface ReportResult {
  id: string;
  reportName: string;
  createdAt: string;
  creatorId: string;
  isReady: boolean;
  docMetas: DocMeta[];
  pdfUrl: string;
  docxUrl: string;
}

const mockReport = () => {
  const mockReport: ReportResult = {
    id: "1",
    reportName: "Статистика Общая май 2023",
    createdAt: "2021-08-01T00:00:00.000Z",
    creatorId: "1",
    isReady: true,
    docMetas: [
      {
        id: "1",
        firstName: "Евгений",
        middleName: "Александрович",
        lastName: "Мастакин",
        position: "Врач аллерголог-иммунолог",
        rate: 10,
        reportId: "1",
        patients: [
          {
            id: "1",
            firstName: "John",
            middleName: "Doe",
            lastName: "Smith",
            diagnosis: "Covid-19",
          },
          {
            id: "2",
            firstName: "John",
            middleName: "Doe",
            lastName: "Smith",
            diagnosis: "Covid-19",
          },
        ],
      },
      {
        id: "2",
        firstName: "John",
        middleName: "Doe",
        lastName: "Smith",
        position: "Doctor",
        rate: 5,
        reportId: "1",
        patients: [
          {
            id: "3",
            firstName: "John",
            middleName: "Doe",
            lastName: "Smith",
            diagnosis: "Covid-19",
          },
        ],
      },
    ],
    pdfUrl:
      "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
    docxUrl:
      "https://file-examples-com.github.io/uploads/2017/02/file-sample_100kB.docx",
  };
  return mockReport;
};

export const ReportEndpoint = new (class {
  async load(id: string) {
    // const result = await api("get", `/report/${id}`);
    // return result as ReportResult;
    return mockReport();
  }
})();
