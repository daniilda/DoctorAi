import { Button } from "@/components/ui";
import DownloadSvg from "@/assets/download.svg";

const Download = ({ pdf, docx }: { pdf?: string; docx?: string }) => {
  return (
    <div className="flex flex-wrap ml-auto gap-4 w-full lg:w-fit">
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
