import * as FileSystem from "expo-file-system";
import { apiFetch } from "./api";

export async function uploadFileWithSignedUrl(uploadUrl: string, localUri: string, contentType: string) {
  const response = await FileSystem.uploadAsync(uploadUrl, localUri, {
    httpMethod: "PUT",
    uploadType: FileSystem.FileSystemUploadType.BINARY_CONTENT,
    headers: {
      "Content-Type": contentType
    }
  });

  if (response.status < 200 || response.status >= 300) {
    throw new Error(`Upload failed (${response.status})`);
  }
}

export async function requestVocalUpload(projectId: string) {
  return apiFetch<{ key: string; uploadUrl: string }>(`/ai/projects/${projectId}/upload-vocal-url`, {
    method: "POST"
  });
}
