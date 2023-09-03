import api from "@/utils/api";

const IS_MOCK = import.meta.env.VITE_IS_MOCK === "true";

interface UploadResult {
  id: string;
}

export namespace UploadEndpoint {
  export const upload = async (
    files: File[],
    title: string,
    onProgress?: (progress: number) => void
  ) => {
    if (IS_MOCK) {
      await new Promise((resolve) => setTimeout(resolve, 500));

      for (let i = 1; i <= 10; i++) {
        await new Promise((resolve) => setTimeout(resolve, 150));

        onProgress?.(i * 10);
      }

      await new Promise((resolve) => setTimeout(resolve, 1500));

      return { id: "mock1" } as UploadResult;
    }

    const formData = new FormData();
    files.forEach((file) => {
      formData.append("FileCollection", file);
    });
    formData.append("ReportName", title);
    const result = await api.post("/report/create", formData, {
      onUploadProgress: (progressEvent: ProgressEvent) => {
        const progress = Math.round(
          (progressEvent.loaded / progressEvent.total) * 100
        );
        onProgress?.(progress);
      },
    });
    return { id: result } as UploadResult;
  };
}
