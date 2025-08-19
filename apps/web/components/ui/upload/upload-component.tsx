// FileUploadBatch.tsx
import { FileUploader } from 'react-drag-drop-files';

import { UploadComponentProps } from './upload-component.interface';
import { useUploadComponent } from './upload-component.logic';
import { ImagePreview } from './image-preview';

export function UploadComponent(props: UploadComponentProps) {
  const {
    className,
    style,
    fileTypes = ['JPG', 'PNG', 'JPEG', 'PDF'],
    progressBarClassName,
    progressBarStyle,
  } = props;

  const { files, uploadProgress, status, errorMsg, handleChange, removeFile, handleStartUpload } =
    useUploadComponent(props);

  return (
    <div className={className} style={style}>
      <FileUploader handleChange={handleChange} name="file" multiple={true} types={fileTypes} />

      {/* Image preview thumbnails with per-image progress bars */}
      <div className="mt-3">
        <ImagePreview files={files} uploadProgress={uploadProgress} onRemove={removeFile} />
      </div>

      <div className="mt-3">
        <button
          className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 cursor-pointer"
          onClick={handleStartUpload}
          disabled={status === 'uploading' || status === 'done'}
        >
          {status === 'uploading' ? 'Uploading…' : 'Start upload'}
        </button>
        {status === 'done' && <div className="text-green-600 mt-2">Upload terminé ✅</div>}
        {status === 'error' && <div className="text-red-600 mt-2">Erreur: {errorMsg}</div>}
      </div>
    </div>
  );
}
