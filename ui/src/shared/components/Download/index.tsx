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
  return (
    <div
      className={`flex flex-wrap ml-auto gap-4 w-full ${
        wide ? "md:w-fit" : "lg:w-fit"
      }`}
    >
      <Button
        appearance="main"
        fontSize="lg"
        className="flex items-center px-4 gap-1 justify-center w-full md:w-auto"
      >
        <DownloadSvg />
        Скачать DOCX
      </Button>
      <Button
        appearance="main"
        fontSize="lg"
        className="flex items-center px-4 gap-1 justify-center w-full md:w-auto"
      >
        <DownloadSvg />
        Скачать PDF
      </Button>
    </div>
  );
};

export default Download;
