export interface DiaryEntry {
  id: string;
  title: string;
  content: string;
  date: string;
  createdAt: string;
  updatedAt: string;
  tags?: string[];
  mood?: string | null;
}

export interface DiaryFormData {
  title: string;
  content: string;
  date: string;
  tags?: string[];
  mood?: string;
}