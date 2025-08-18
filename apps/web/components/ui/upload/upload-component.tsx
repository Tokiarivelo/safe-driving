// FileUploadBatch.tsx
import React, { useState, useCallback } from 'react';
import { FileUploader } from 'react-drag-drop-files';
import { gql, useMutation } from '@apollo/client';
import pLimit from 'p-limit';
import { v4 as uuidv4 } from 'uuid';

// GraphQL mutation — adapte le nom/des champs selon ton schema
const CREATE_BATCH_PRESIGNED = gql`
  mutation CreateBatchPresignedUrls($type: ImageType!, $files: [FileMetaInput!]!) {
    createBatchPresignedUrls(type: $type, files: $files) {
      url
      key
      expiresIn
      # si ton resolver renvoie uniqueId/originalName/contentType, tu peux les demander ici
    }
  }
`;

/** Types TS utiles */
type Presigned = {
  url: string;
  key: string;
  expiresIn: number;
};

type FileMeta = {
  originalName: string;
  contentType: string;
  uniqueId?: string;
};

/** Upload one file using XHR to get progress events (PUT presigned) */
function uploadWithXhr(
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
async function uploadMultipleWithLimit(
  presignedList: Presigned[],
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

/** React component */
export function UploadComponent() {
  const [files, setFiles] = useState<File[]>([]);
  const [uploadProgress, setUploadProgress] = useState<Record<number, number>>({});
  const [status, setStatus] = useState<'idle' | 'uploading' | 'done' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const [createPresignedUrls] = useMutation(CREATE_BATCH_PRESIGNED);

  const handleChange = useCallback((incoming: any) => {
    console.log('incoming :>> ');

    // react-drag-drop-files sometimes returns a single File or array
    const arr = Array.from(incoming) as File[];

    setFiles(arr);
    setUploadProgress({});
    setStatus('idle');
    setErrorMsg(null);
  }, []);

  const onProgressPerFile = (index: number, percent: number) => {
    setUploadProgress(prev => ({ ...prev, [index]: percent }));
  };

  const handleStartUpload = async () => {
    if (!files.length) return;
    setStatus('uploading');
    setErrorMsg(null);

    try {
      // 1) prepare files meta for GraphQL (originalName, contentType, uniqueId)
      const fileMetas: FileMeta[] = files.map(f => ({
        originalName: f.name,
        contentType: f.type || 'application/octet-stream',
        uniqueId: uuidv4(),
      }));

      // 2) call GraphQL to get presigned URLs in batch
      const { data } = await createPresignedUrls({
        variables: {
          type: 'USER', // adapte à ton ImageType
          files: fileMetas,
        },
      });
      const presignedList: Presigned[] = data.createBatchPresignedUrls;

      // 3) upload in parallel with concurrency control
      // Option A: using p-limit function (recommended)
      await uploadMultipleWithLimit(presignedList, files, onProgressPerFile, 3, 3);

      // Option B: alternative pool (no extra dep)
      // await uploadMultiplePool(presignedList, files, onProgressPerFile, 3);

      // 4) optional: call a confirmation mutation to register files in DB
      // await confirmUploads({ variables: { uploaded: presignedList.map(p => ({ key: p.key, uniqueId: ... })) } });

      setStatus('done');
    } catch (err: any) {
      console.error(err);
      setErrorMsg(err?.message || 'Upload failed');
      setStatus('error');
    }
  };

  return (
    <div style={{ padding: 12 }}>
      <FileUploader
        handleChange={handleChange}
        name="file"
        multiple={true}
        types={['JPG', 'PNG', 'PNG', 'JPEG', 'PDF']}
      />
      <div style={{ marginTop: 12 }}>
        {files.map((f, i) => (
          <div key={i} style={{ marginBottom: 8 }}>
            <strong>{f.name}</strong> — {Math.round(f.size / 1024)} KB
            <div style={{ height: 8, width: 300, background: '#eee', marginTop: 6 }}>
              <div
                style={{
                  width: `${uploadProgress[i] ?? 0}%`,
                  height: '100%',
                  background: '#4caf50',
                }}
              />
            </div>
            <div style={{ fontSize: 12 }}>{uploadProgress[i] ?? 0}%</div>
          </div>
        ))}
      </div>

      <div style={{ marginTop: 12 }}>
        <button onClick={handleStartUpload} disabled={status === 'uploading'}>
          {status === 'uploading' ? 'Uploading…' : 'Start upload'}
        </button>
        {status === 'done' && <div style={{ color: 'green' }}>Upload terminé ✅</div>}
        {status === 'error' && <div style={{ color: 'red' }}>Erreur: {errorMsg}</div>}
      </div>
    </div>
  );
}
