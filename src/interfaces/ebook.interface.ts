export interface IAddEbook {
  title: string;
  description: string;
  cover?: string;
  url: string;
  author: string;
  categoryId: string;
  status: EbookStatus;
  published_at?: Date;
}

enum EbookStatus {
  DRAFT = "DRAFT",
  PUBLISHED = "PUBLISHED",
  UNPUBLISHED = "UNPUBLISHED",
}

export interface IGetAllEbooks {
  id: string;
  title: string;
  description: string;
  cover: string | null;
  status: string;
  url: string;
  author: string;
  category: string;
  published_at: string | null;
}
