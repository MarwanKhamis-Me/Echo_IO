
export enum ToolType {
  DEEPFAKE = 'deepfake',
  MALWARE = 'malware',
  FAKE_NEWS = 'fake_news'
}

export type Language = 'ar' | 'en';

export interface AnalysisResult {
  tool: ToolType;
  status: 'safe' | 'warning' | 'danger';
  judgment: string;
  confidence: number;
  explanation: string;
  sources?: Array<{ title: string; uri: string }>;
}

export interface FileInfo {
  name: string;
  type: string;
  size: string;
  previewUrl?: string;
}
