import { api } from "@/utils/api";

interface UploadResult {
  id: string;
}

export const UploadEndpoint = new (class {
  async upload(files: File[], title: string) {
    const formData = new FormData();
    files.forEach((file) => {
      formData.append("FileCollection", file);
    });
    formData.append("ReportName", title);
    const result = await api.form("/report/create", formData);
    return { id: result } as UploadResult;
  }
})();
