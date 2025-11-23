import { useCallback, useState } from 'react';
import { fileKey, uploadMultipleWithLimit } from './upload-component.service';
import {
  FileType,
  PresignedUrl,
  useCompleteUploadBulkMutation,
  useCreateBatchPresignedUrlsMutation,
} from '@/graphql/generated/graphql';
import { FileMeta, UploadComponentProps } from './upload-component.interface';
import { v4 as uuidv4 } from 'uuid';

export const useUploadComponent = (props: UploadComponentProps) => {
  const { fileType = FileType.USER, concurrency = 3, maxRetries = 3, onComplete, onError } = props;

  // Logic for the upload component
  const [files, setFiles] = useState<File[]>([]);
  const [uploadProgress, setUploadProgress] = useState<Record<number, number>>({});
  const [status, setStatus] = useState<'idle' | 'uploading' | 'done' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [createPresignedUrls] = useCreateBatchPresignedUrlsMutation();
  const [completeUploadBulk] = useCompleteUploadBulkMutation();

  const onProgressPerFile = (index: number, percent: number) => {
    setUploadProgress(prev => ({ ...prev, [index]: percent }));
  };

  const handleStartUpload = async () => {
    if (!files.length || status === 'uploading' || status === 'done') return;
    setStatus('uploading');
    setErrorMsg(null);
    try {
      const fileMetas: FileMeta[] = files.map(f => ({
        originalName: f.name,
        contentType: f.type || 'application/octet-stream',
        uniqueId: uuidv4(),
      }));
      const { data } = await createPresignedUrls({
        variables: {
          type: fileType,
          files: fileMetas,
        },
      });
      if (!data?.createBatchPresignedUrls) {
        throw new Error('Failed to get presigned URLs');
      }
      const presignedList: PresignedUrl[] = data.createBatchPresignedUrls;
      const results = await uploadMultipleWithLimit(
        presignedList,
        files,
        onProgressPerFile,
        concurrency,
        maxRetries,
      );
      setStatus('done');
      const susscessResults = results.filter(r => r.success);
      if (susscessResults.length > 0) {
        await completeUploadBulk({
          variables: {
            keys: susscessResults.map(r => r.key || ''),
            type: fileType,
          },
        });
      }
      if (onComplete) onComplete(results);
      return results;
    } catch (err) {
      setStatus('error');
      setErrorMsg(err?.message || 'Upload failed');
      if (onError) onError(err);
    }
  };
  // handleChange amélioré
  const handleChange = useCallback(
    (
      incoming: FileList | File[],
      options?: { replace?: boolean; removeUploadedOnAdd?: boolean },
    ) => {
      const incomingArr: File[] = Array.from(incoming || []);
      const removeUploaded = options?.removeUploadedOnAdd ?? true;

      // remplacement pur si demandé
      if (options?.replace) {
        setFiles(incomingArr);
        setUploadProgress(prev => {
          if (Array.isArray(prev)) return incomingArr.map(() => 0);
          const nextObj: Record<string, number> = {};
          incomingArr.forEach(f => (nextObj[fileKey(f)] = 0));
          return nextObj as any;
        });
        setStatus('idle');
        setErrorMsg(null);
        return;
      }

      // comportement "ajout" : on part des fichiers existants
      const existingFiles: File[] = files || [];

      // si on veut supprimer les fichiers déjà uploadés avant de merge
      let baseFiles = existingFiles;
      if (removeUploaded && existingFiles.length > 0) {
        // récupère la progression pour chaque fichier existant
        if (Array.isArray(uploadProgress)) {
          // uploadProgress est un tableau aligné avec existingFiles
          baseFiles = existingFiles.filter((f, i) => (uploadProgress[i] ?? 0) < 100);
        } else {
          // uploadProgress est mapping { key: number }
          baseFiles = existingFiles.filter(f => {
            const k = fileKey(f);
            return ((uploadProgress as Record<string, number>)?.[k] ?? 0) < 100;
          });
        }
      }

      // fusion + déduplication : on veut préserver l'ordre baseFiles puis incoming nouveaux
      const map = new Map<string, File>();
      baseFiles.forEach(f => map.set(fileKey(f), f));
      for (const f of incomingArr) {
        const k = fileKey(f);
        if (!map.has(k)) map.set(k, f);
      }
      const merged = Array.from(map.values());

      // mettre à jour files
      setFiles(merged);

      // synchroniser uploadProgress : garder valeurs existantes pour les fichiers préservés
      setUploadProgress(prev => {
        if (Array.isArray(prev)) {
          // crée map key->progress depuis prev & existingFiles (avant modif)
          const prevMap: Record<string, number> = {};
          existingFiles.forEach((f, i) => {
            prevMap[fileKey(f)] = prev[i] ?? 0;
          });
          return merged.map(f => prevMap[fileKey(f)] ?? 0);
        }
        // prev en objet mapping
        const nextObj: Record<string, number> = {};
        merged.forEach(f => {
          const k = fileKey(f);
          nextObj[k] = (prev && (prev as Record<string, number>)[k]) ?? 0;
        });
        return nextObj as Record<string, number>;
      });

      setStatus('idle');
      setErrorMsg(null);
    },
    // Assure-toi d'ajouter les dépendances correctes ici
    [files, uploadProgress, setFiles, setUploadProgress, setStatus, setErrorMsg],
  );

  // removeFile utilisant replace (pour éviter ré-fusion)
  const removeFile = useCallback(
    (index: number) => {
      const next = files.filter((_, i) => i !== index);
      // remplace la liste (donc handleChange n'essaye pas de "ré-ajouter" l'élément supprimé)
      handleChange(next, { replace: true });
    },
    [files, handleChange],
  );

  return {
    files,
    uploadProgress,
    status,
    errorMsg,
    handleChange,
    removeFile,
    handleStartUpload,
  };
};
