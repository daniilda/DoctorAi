import api from "@/utils/api";

interface UploadResult {
  id: string;
}

export const UploadEndpoint = new (class {
  async upload(
    files: File[],
    title: string,
    onProgress?: (progress: number) => void
  ) {
    const formData = new FormData();
    files.forEach((file) => {
      formData.append("FileCollection", file);
    });
    formData.append("ReportName", title);
    const result = await api("post", "/report/create", formData, {
      onUploadProgress: (progressEvent: ProgressEvent) => {
        const progress = Math.round(
          (progressEvent.loaded / progressEvent.total) * 100
        );
        onProgress?.(progress);
      },
    });
    return { id: result } as UploadResult;
  }
})();
