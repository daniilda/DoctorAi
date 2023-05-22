import { UploadStore } from "@/stores";
import { observer } from "mobx-react-lite";
import DocViewer, { PDFRenderer } from "react-doc-viewer";

const Preview: React.FC = observer(() => {
  if (!UploadStore.files || UploadStore.files.length === 0) return <></>;

  console.log(UploadStore.files[0].uri);
  return (
    <DocViewer
      pluginRenderers={[PDFRenderer]}
      theme={{
        text_primary: "#000000",
        primary: "red",
        secondary: "red",
        text_secondary: "red",
        text_tertiary: "red",
      }}
      // documents={UploadStore.files}
      documents={[
        {
          uri: UploadStore.files[0].uri,
          fileType: "pdf",
        },
      ]}
    />
  );
});

export default Preview;
