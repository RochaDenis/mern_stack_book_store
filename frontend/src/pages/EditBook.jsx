import React, { useEffect, useState } from "react";
import axios from "axios";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";
import { useNavigate, useParams } from "react-router";
import { useSnackbar } from "notistack";

const EditBooks = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [publishYear, setPublishYear] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const {id} = useParams();
  const { enqueueSnackbar } = useSnackbar();
  useEffect(() => {
    setLoading(true);
    axios.get(`http://localhost:5555/books/${id}`)
    .then((response) => {
      setTitle(response.data.title);
      setAuthor(response.data.author);
      setPublishYear(response.data.publishYear);
      setLoading(false);
    })
    .catch((error) => {
      setLoading(false);
      // alert("Error to get book");
      enqueueSnackbar("Error to get book", { variant: "error" });
      console.error(error);
    });
  }, []);

  const handleEditBook = () => {
    const data = {
      title,
      author,
      publishYear,
    };
    setLoading(true);
    axios
      .put(`http://localhost:5555/books/${id}`, data)
      .then(() => {
        setLoading(false);
        enqueueSnackbar("Book saved", { variant: "success" });
        navigate("/");
      })
      .catch((error) => {
        setLoading(false);
        // alert("Error to save book");
        enqueueSnackbar("Error to save book", { variant: "error" });
        console.error(error);
      });
  };
  return (
    <div className="p-4">
      <BackButton />
      <h1 className="text-3xl my-4">Edit Book</h1>
      {loading ? <Spinner /> : ""}
      <div className="flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto">
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">Título</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border-2 border-gray-500 px-4 p-2 w-full"
          />
        </div>
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">Autor</label>
          <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className="border-2 border-gray-500 px-4 p-2 w-full"
          />
        </div>
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">
            Ano de Publicação
          </label>
          <input
            type="text"
            value={publishYear}
            onChange={(e) => setPublishYear(e.target.value)}
            className="border-2 border-gray-500 px-4 p-2 w-full"
          />
        </div>
        <button className="p-2 bg-sky-300" onClick={handleEditBook}>
          Save
        </button>
      </div>
    </div>
  );
};


export default EditBooks