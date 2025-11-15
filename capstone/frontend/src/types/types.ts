export type Book = {
  id: number;
  title: string;
  author: string;
  description?: string;
  body?: string;
  date: string;
  userId?: number;
};

export type NewBook = {
  id?: number;
  title: string;
  body: string;
  author?: string;
  description?: string;
  userId?: number;
  createdAt: string;
};

export type User = {
  id: number;
  name: string;
  userId?: number;
  username?: string;
  email?: string;
  phone?: string;
  website?: string;
  address?: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  } | string;
  company?: {
    name: string;
  };
};
export type Props = {
          userLatitude: number;
          userLongitude: number;
};
