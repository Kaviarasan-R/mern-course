import { Routes, Route } from "react-router-dom";
import BooksDisplay from "@/components/Books/BooksDisplay";
import UserList from "@/components/Users/UserList";
import UserItem from "@/components/Users/UserItem";
import Login from "@/components/Login/Login";
import Layout from "@/components/Header/Layout";
import SignUp from "@/components/Login/SignUp";

function RouterFunction() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<BooksDisplay />} />
      </Route>
      <Route path="/home" element={<Layout />}>
        <Route index element={<BooksDisplay />} />
      </Route>
      <Route path="/home/users">
        <Route index element={<UserList />} />
        <Route path=":userId" element={<UserItem />} />
      </Route>
      <Route path="/login">
        <Route index element={<Login />} />
        <Route path="/login/home" element={<BooksDisplay />} />
      </Route>
      <Route path="/signup">
        <Route index element={<SignUp />} />
      </Route>
    </Routes>
  );
}

export default RouterFunction;
