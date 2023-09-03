import { ReportResult } from "@/api/endpoints";
import { cardWithHover } from "../../Report/tailwind";
import Download from "@/components/Download";
import ChevronSvg from "@/assets/chevron.svg";
import cl from "../styles.module.scss";

export const ReportCard = ({
  report,
  onClick,
}: {
  report: ReportResult;
  onClick: () => void;
}) => (
  <div
    className={`${cardWithHover} ${cl.card} gap-4 items-center select-none`}
    onClick={onClick}
  >
    <div className="flex flex-1 flew-wrap flex-col md:flex-row gap-4">
      <div className="flex flex-col gap-1">
        <h2 className="text-2xl font-bold">{report.reportName}</h2>
        <p className="text-text-secondary text-sm">
          {new Date(report.createdAt).toLocaleString()}
        </p>
      </div>
      {report.isReady && (
        <Download wide pdf={report.pdfUrl} docx={report.docxUrl} />
      )}
    </div>
    <div className="flex items-center ml-auto">
      <ChevronSvg className={cl.card__chevron} />
    </div>
  </div>
);
