import React from "react";
import "./index.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import DeleteBooks from "./pages/DeleteBook";
import ShowBook from "./pages/ShowBook";
import EditBook from "./pages/EditBook";
import CreateBooks from "./pages/CreateBooks";

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/books/create' element={<CreateBooks/>}/>
      <Route path='/books/details/:id' element={<ShowBook/>}/>
      <Route path='/books/edit/:id' element={<EditBook/>}/>
      <Route path='/books/delete/:id' element={<DeleteBooks/>}/>
    </Routes>
  )
};

export default App;

