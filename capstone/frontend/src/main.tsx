import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { Provider } from "react-redux";
import { store } from "./store/store.ts";
import { fetchBooksData } from "./slice/BooksSlice.tsx";
import { fetchUsers } from "./slice/UsersSlice.tsx";
import { BrowserRouter } from "react-router-dom";

store.dispatch(fetchBooksData());
store.dispatch(fetchUsers());

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </StrictMode>
);
