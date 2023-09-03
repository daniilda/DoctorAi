import { Dashboard, ReportResult } from "./ReportEndpoint";

export const MOCK_USER = {
  id: "4ca98646-fe82-40d9-8551-6bb5a9e96c6c",
  username: "housemd",
  firstName: "Грегори",
  middleName: "Джон",
  lastName: "Хаус",
  position: "Руководитель Отделения",
  picUrl:
    "https://naked-science.ru/wp-content/uploads/2016/04/article_entweeklyhires02.jpg",
};

export const MOCK_REPORTS: ReportResult[] = [
  {
    id: "mock1",
    reportName: "Отчет по трём врачам",
    createdAt: "2023-05-28T20:44:41.330976",
    creator: MOCK_USER,
    isReady: true,
    reportDocs: [
      {
        id: "7f4944af-5dfa-4dfd-9026-bf486b786fe6",
        firstName: "Денис",
        middleName: "Александрович",
        lastName: "Данильчук",
        position: "Терапевт",
        division: "Терапия",
        rate: 29,
        reportPatients: [
          {
            id: "fdbafafd-2e9a-47df-afa1-75b70f9a9f6c",
            firstName: "Олег",
            middleName: "Иванович",
            lastName: "Навальный",
            diagnosis: "Аутоиммунный тиреоидит",
            rate: 2,
            reportAppointments: [
              {
                id: "5740eb6d-1201-479b-9b58-ad695a513387",
                name: "Клинический осмотр",
                appointmentState: 2,
              },
              {
                id: "35c60ca6-6f5f-4187-bd6f-e5a8b441e34d",
                name: "Ультразвуковое исследование щитовидной железы",
                appointmentState: 3,
              },
              {
                id: "2d53b191-6e92-4668-8160-259caf62cfa5",
                name: "Консультация эндокринолога",
                appointmentState: 3,
              },
              {
                id: "58303f74-5bc7-4519-a7fd-b5cde44f012e",
                name: "Анализ на наличие аутоантител к щитовидной железе",
                appointmentState: 3,
              },
            ],
            pdfUrl: null,
            docxUrl: null,
          },
        ],
        pdfUrl: null,
        docxUrl: null,
      },
      {
        id: "7c2c9763-541b-4dfb-b42b-7d6576d5df46",
        firstName: "Илья",
        middleName: "Олегович",
        lastName: "Антонов",
        position: "Терапевт",
        division: "Терапия",
        rate: 100,
        reportPatients: [
          {
            id: "e261ae0b-8c62-4c6a-a1d4-0736ecf58ae3",
            firstName: "Даниил",
            middleName: "Андреевич",
            lastName: "Кузнецов",
            diagnosis: "Простуда",
            rate: 1,
            reportAppointments: [
              {
                id: "a44b5269-a7b4-4552-aea2-d8d3c74bd282",
                name: "Анализ крови на наличие вируса",
                appointmentState: 1,
              },
              {
                id: "70625f77-4496-48f9-98e4-9e3ad326418d",
                name: "Консультация оториноларинголога",
                appointmentState: 1,
              },
              {
                id: "04969509-ccad-4ecc-8dd1-2c4fde12c721",
                name: "Лабораторный анализ мазка из носа",
                appointmentState: 1,
              },
              {
                id: "33ffc91c-17e3-49fc-9833-530de2b13d29",
                name: "Профилактика и симптоматическое лечение",
                appointmentState: 1,
              },
              {
                id: "508ceeb2-b951-4b7b-834c-71f5d6492c15",
                name: "Клинический осмотр",
                appointmentState: 1,
              },
            ],
            pdfUrl: null,
            docxUrl: null,
          },
        ],
        pdfUrl: null,
        docxUrl: null,
      },
      {
        id: "73a56af2-b7b0-475b-9e6a-7e6834e7c168",
        firstName: "Дарья",
        middleName: "Сергеевна",
        lastName: "Корнева",
        position: "Врач-дерматолог",
        division: "Дерматология",
        rate: 62,
        reportPatients: [
          {
            id: "2d121c50-8f82-47af-9342-341f6d67fc93",
            firstName: "Елена",
            middleName: "Яковлевна",
            lastName: "Левонская",
            diagnosis: "Папулезный эласторексис",
            rate: 2,
            reportAppointments: [
              {
                id: "0f9eeda4-21d6-419c-abb0-079421eb0551",
                name: "Дерматологический осмотр",
                appointmentState: 3,
              },
              {
                id: "7c1b9d38-2336-49e7-816b-43d273709bf3",
                name: "Клиническое обследование",
                appointmentState: 2,
              },
              {
                id: "12289b48-307e-41dd-bed5-ee888ebf842d",
                name: "Гистологическое исследование",
                appointmentState: 2,
              },
              {
                id: "eba287e5-e36e-4d32-8357-2ea578fb02fb",
                name: "Ультразвуковое исследование щитовидной железы",
                appointmentState: 1,
              },
              {
                id: "57f12a47-c619-45d2-95a8-ea387124fb78",
                name: "Генетическое тестирование",
                appointmentState: 1,
              },
            ],
            pdfUrl: null,
            docxUrl: null,
          },
        ],
        pdfUrl: null,
        docxUrl: null,
      },
    ],
    pdfUrl:
      "https://doc-ai-reports.obs.ru-moscow-1.hc.sbercloud.ru/b107f8d1-5c8d-4d74-8e99-fab1bb6316b4.pdf",
    docxUrl: "",
  },
];

export const MOCK_REPORT_PENDING: ReportResult = {
  id: "mock1",
  reportName: "Отчет 1",
  createdAt: "2023-05-28T20:44:41.330976",
  creator: MOCK_USER,
  isReady: false,
  pdfUrl: null,
  docxUrl: null,
};

export const MOCK_DASHBOARD: Dashboard = {
  avgPerc: 4,
  topDivisionName: "Терапия",
  topDivisionPerc: 63,
  lastDivisionName: "",
  lastDivisionPerc: 21,
  top1: "Антонов Илья Олегович",
  top1Val: 100,
  top2: "Корнева Дарья Сергеевна",
  top2Val: 42,
  top3: "Данильчук Денис Александрович",
  top3Val: 27,
};

export const MOCK_FILE_NAME = "b107f8d1-5c8d-4d74-8e99-fab1bb6316b4.pdf";
