import React, { useState } from "react";

import Spinner from "../components/Spinner";
import axios from "axios";
import { useNavigate, useParams } from "react-router";
import BackButton from "../components/BackButton";
import { useSnackbar } from "notistack";

const DeleteBook = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar();
  const handleDeleteBook = () => {
    setLoading(true);
    axios
      .delete(`http://localhost:5555/books/${id}`)
      .then(() => {
        setLoading(false);
        enqueueSnackbar("Book deleted", { variant: "success" });
        navigate("/");
      })
      .catch((error) => {
        setLoading(false);
        // alert("Error to delete book");
        enqueueSnackbar("Error to delete book", { variant: "error" });        
        console.error(error);
      });
  };

  return (
    <div className="p-4">
      <BackButton/>
      <h1 className="text-3xl my-4">Delete Book</h1>
      {loading ? <Spinner /> : ""}
      <div className="flex flex-col item-center border-2 border-sky-400 rounded xl w-[600px] p-8 mx-auto">
        <h3 className="text-2xl p-4">
          Você tem certeza que deseja excluir esse livro?
        </h3>

        <button
          className="p-4 bg-red-600 text-white m- -12 w-full"
          onClick={handleDeleteBook}
        >
          Sim, excluir!
        </button>
      </div>
    </div>
  );
};

export default DeleteBook;
