import { FileType } from '@/graphql/generated/graphql';

export type FileMeta = {
  originalName: string;
  contentType: string;
  uniqueId?: string;
};

export interface UploadComponentProps {
  fileType?: FileType;
  fileTypes?: string[];
  concurrency?: number;
  maxRetries?: number;
  onComplete?: (results: Array<{ key?: string; success: boolean }>) => void;
  onError?: (error: Error) => void;
  className?: string;
  style?: React.CSSProperties;
  progressBarClassName?: string;
  progressBarStyle?: React.CSSProperties;
}
