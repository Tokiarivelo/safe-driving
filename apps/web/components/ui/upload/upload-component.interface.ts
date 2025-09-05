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
  onComplete?: (results: any[]) => void;
  onError?: (error: Error) => void;
  className?: string;
  style?: React.CSSProperties;
  progressBarClassName?: string;
  progressBarStyle?: React.CSSProperties;
}
