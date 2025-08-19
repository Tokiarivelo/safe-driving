import pLimit from 'p-limit';
import { PresignedUrl } from '@/graphql/generated/graphql';

/** Upload one file using XHR to get progress events (PUT presigned) */
export function uploadWithXhr(
  url: string,
  file: File,
  contentType?: string,
  onProgress?: (percent: number) => void,
): Promise<void> {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open('PUT', url, true);
    if (contentType) xhr.setRequestHeader('Content-Type', contentType);
    xhr.upload.onprogress = e => {
      if (e.lengthComputable && onProgress) {
        const pct = Math.round((e.loaded / e.total) * 100);
        onProgress(pct);
      }
    };
    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) resolve();
      else reject(new Error(`Upload failed with status ${xhr.status}`));
    };
    xhr.onerror = () => reject(new Error('Network error during upload'));
    xhr.send(file);
  });
}

/** uploadMultiple using p-limit (recommended) */
export async function uploadMultipleWithLimit(
  presignedList: PresignedUrl[],
  files: File[],
  onProgressPerFile: (index: number, percent: number) => void,
  concurrency = 3,
  maxRetries = 3,
) {
  const limit = pLimit(concurrency);

  const tasks = presignedList.map((p, idx) =>
    limit(async () => {
      const file = files[idx];
      if (!file) throw new Error('File missing for presigned url');

      let attempt = 0;
      while (attempt < maxRetries) {
        try {
          await uploadWithXhr(p.url, file, file.type, pct => onProgressPerFile(idx, pct));
          // succeeded
          onProgressPerFile(idx, 100);
          return { idx, success: true, key: p.key };
        } catch (err) {
          attempt++;
          if (attempt >= maxRetries) {
            onProgressPerFile(idx, 0);
            throw err;
          }
          // backoff
          await new Promise(r => setTimeout(r, 300 * attempt));
        }
      }
      // unreachable
      throw new Error('Max retries exhausted');
    }),
  );

  return Promise.all(tasks); // will reject if any upload (after retries) fails
}

// util
export const fileKey = (f: File) => `${f.name}:${f.size}:${f.lastModified}`;
