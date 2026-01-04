export enum View {
  DASHBOARD = 'DASHBOARD',
  QMS = 'QMS',
  TECH_DOCS = 'TECH_DOCS',
  ASSISTANT = 'ASSISTANT',
  SETTINGS = 'SETTINGS',
}

export interface Document {
  id: string;
  title: string;
  status: 'DRAFT' | 'REVIEW' | 'RELEASED';
  version: string;
  lastModified: string;
  content?: string;
}

export interface Project {
  id: string;
  name: string;
  deviceClass: string;
  progress: number;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
  isError?: boolean;
}