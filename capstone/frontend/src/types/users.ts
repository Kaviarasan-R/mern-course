export interface User {
  _id: string;
  name: string;
  username: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}

export interface UsersState {
  users: User[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
  filters: {
    search: string;
    sortBy: "createdAt" | "name";
    order: "asc" | "desc";
  };
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}
