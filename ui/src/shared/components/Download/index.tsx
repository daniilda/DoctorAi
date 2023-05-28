import { Button } from "@/components/ui";
import DownloadSvg from "@/assets/download.svg";

const Download = ({
  pdf,
  docx,
  wide,
}: {
  pdf?: string;
  docx?: string;
  wide?: boolean;
}) => {
  if (!pdf && !docx) return <></>;
  return (
    <div
      className={`flex flex-wrap ml-auto gap-4 w-full ${
        wide ? "md:w-fit" : "lg:w-fit"
      }`}
    >
      {docx && (
        <Button
          appearance="main"
          fontSize="lg"
          className="flex items-center px-4 gap-1 h-[52px] justify-center w-full md:w-auto"
          onClick={(e) => {
            e.stopPropagation();
            if (docx) window.open(docx, "_blank", "noreferrer");
          }}
        >
          <DownloadSvg />
          Скачать DOCX
        </Button>
      )}
      {pdf && (
        <Button
          appearance="main"
          fontSize="lg"
          className="flex items-center px-4 gap-1 h-[52px] justify-center w-full md:w-auto"
          onClick={(e) => {
            e.stopPropagation();
            console.log(pdf);
            if (pdf) window.open(pdf, "_blank", "noreferrer");
          }}
        >
          <DownloadSvg />
          Скачать PDF
        </Button>
      )}
    </div>
  );
};

export default Download;
