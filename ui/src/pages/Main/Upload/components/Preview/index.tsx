import { UploadStore } from "@/stores";
import { observer } from "mobx-react-lite";
import { useEffect, useRef, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

const Preview: React.FC = observer(() => {
  const [base64, setBase64] = useState("");
  const docRef = useRef<any>();

  useEffect(() => {}, [UploadStore.files]);
  if (!UploadStore.files || UploadStore.files.length === 0) return <></>;

  const reader = new FileReader();
  reader.readAsDataURL(UploadStore.files[0]);
  reader.onload = () => {
    console.log(docRef);
    setBase64(reader.result as string);
  };
  console.log(base64);
  return (
    <Document file={base64} ref={docRef}>
      <Page pageNumber={1} />
    </Document>
  );
});

export default Preview;
