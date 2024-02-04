import React from "react";
import { Routes, Route } from "react-router-dom";
import Signup from "../components/Signup";
import Login from "../components/Login";
import Books from "../components/Books";
import CreateBook from "../components/CreateBooks";

const AllRoutes = () => {
  return (
    <Routes>
      <Route path="/register" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/books" element={<Books />} />
      <Route path="/create" element={<CreateBook />} />
    </Routes>
  );
};

export default AllRoutes;
