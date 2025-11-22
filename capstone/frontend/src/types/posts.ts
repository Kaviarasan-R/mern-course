export interface Post {
  _id: string;
  title: string;
  body: string;
  user: {
    _id: string;
    name: string;
    username: string;
    email: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface CreatePostPayload {
  title: string;
  body: string;
}

export interface UpdatePostPayload {
  id: string;
  title: string;
  body: string;
}

export interface PostsState {
  posts: Post[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
  filters: {
    search: string;
    sortBy: "createdAt" | "title";
    order: "asc" | "desc";
  };
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}
