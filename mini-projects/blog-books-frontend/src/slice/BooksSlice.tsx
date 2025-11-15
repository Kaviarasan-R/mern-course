import { createSlice, createAsyncThunk, nanoid } from "@reduxjs/toolkit";
import { sub } from "date-fns";
import axios from "axios";
import type { RootState } from "../store/store";
import type { Book, NewBook } from "../types/types";

const DATA_URL = "https://jsonplaceholder.typicode.com/posts";

const initialState: {
  books: Book[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
} = {
  books: [],
  status: 'idle',
  error: null,
};

export const fetchBooksData = createAsyncThunk("posts/fetchBooksData", async () => {
  const response = await axios.get(DATA_URL);
  return response.data;
});

export const addNewBooks = createAsyncThunk('posts/addNewBooks', async (initialPost: NewBook) => {
  const response = await axios.post(DATA_URL, initialPost);
  return response.data
})

export const updateBooks = createAsyncThunk('posts/updateBooks', async (updatedPost: Book) => {
  const response = await axios.put(`${DATA_URL}/${updatedPost.id}`, updatedPost);
  return response.data;
});

export const deleteBook = createAsyncThunk('posts/deleteBook', async (postId: number) => {
  await axios.delete(`${DATA_URL}/${postId}`);
  return postId;
});



const booksSlice = createSlice({
  name: "books",
  initialState,
  reducers: {
    displayAllBooks: {
      reducer(state, action) {
        state.books.push(action.payload);
      },
      prepare(title: string, description: string, userId: string) {
        return {
          payload: {
            id: nanoid(),
            title,
            description: description,
            date: new Date().toISOString(),
            userId
          },
          error: undefined,
          meta: undefined
        };
      },
    },
  },
  extraReducers: (builder) => {

    builder.addCase(fetchBooksData.pending, (state) => {
      state.status = "loading";
    });

    builder.addCase(fetchBooksData.fulfilled, (state, action) => {
      state.status = "succeeded";
      let min = 1;
      const loadedData = action.payload.map((data: Book) => {
        data.date = sub(new Date(), { minutes: min++ }).toISOString();
        data.description = data.body;
        data.userId = Number(data.userId);
        return data;
      });
      loadedData.sort((a: Book, b: Book) => b.date.localeCompare(a.date));
      state.books = state.books.concat(loadedData);
    });

    builder.addCase(fetchBooksData.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message || "Something went wrong";
    });
    builder.addCase(addNewBooks.fulfilled, (state, action) => {
      action.payload.userId = Number(action.payload.userId);
      action.payload.date = new Date().toISOString();
      action.payload.description = action.payload.body;
      const { id } = action.payload;
      const addBook = state.books.filter(
        (book) => book.id !== id
        );
      state.books = [ action.payload,...addBook,];
    });
    builder.addCase(addNewBooks.rejected, (state, action) => {
      state.error = action.error.message || "Could not add the book";
    });

    builder.addCase(updateBooks.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(updateBooks.fulfilled, (state, action) => {
      if (!action.payload?.id)return;
      else {
        action.payload.date = new Date().toISOString();
        const index = state.books.findIndex(book => book.id === action.payload.id); 
        state.books[index] = action.payload;
      }
    });
    builder.addCase(updateBooks.rejected, (state, action) => {
      state.error = action.error.message || "Could not update the book";
    });
    builder.addCase(deleteBook.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(deleteBook.fulfilled, (state, action) => {
      const id = action.payload;
      state.books = state.books.filter(book => book.id !== id);
    });
    builder.addCase(deleteBook.rejected, (state, action) => {
      state.error = action.error.message || "Could not delete the book";
    });

  },
})

export const getBooksData = (state: RootState) => state.books.books;
export const getStatus = (state: RootState) => state.books.status;
export const getError = (state: RootState) => state.books.error;

export const { displayAllBooks }  = booksSlice.actions
export default booksSlice.reducer
