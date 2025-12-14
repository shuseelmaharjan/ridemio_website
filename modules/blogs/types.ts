export interface BlogImageDetail {
  id: string;
  file: string;
  file_type: string;
}

export interface BlogPost {
  id: string;
  category: string;
  title: string;
  slug: string;
  content: string;
  cover_image: string;
  cover_image_detail: BlogImageDetail;
  author: string;
  published_date: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  serial: number;
}

export interface BlogsApiResponse {
  count: number;
  total_pages: number;
  current_page: number;
  next: string | null;
  previous: string | null;
  results: BlogPost[];
}