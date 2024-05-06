import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { MdOutlineAddBox } from "react-icons/md";
import Spinner from "../components/Spinner";
import BooksCard from "../components/home/BooksCard";
import BooksTable from "../components/home/BooksTable";
/**
 * Componente de página inicial.
 *
 * @returns {JSX.Element} O elemento JSX da página inicial.
 */
const Home = () => {
  const [books, setBooks] = useState([]); // Estado para armazenar a lista de livros
  const [loading, setLoading] = useState(true); // Estado para controlar o carregamento
  const [showType, setShowType] = useState("table"); // Estado para controlar o tipo de exibição
  useEffect(() => {
    setLoading(true); // Define o estado de carregamento como true

    // Faz uma requisição GET para obter a lista de livros
    axios
      .get("http://localhost:5555/books")
      .then((response) => {
        setBooks(response.data.data); // Atualiza o estado com a lista de livros obtida da resposta
        setLoading(false); // Define o estado de carregamento como false
      })
      .catch((error) => {
        console.log(error); // Exibe o erro no console, caso ocorra
        setLoading(false); // Define o estado de carregamento como false
      });
  }, []);

  return (
    <div className="p-4">
      <div className="flex justify-center items-center gap-x-4">
        <button
          className="bg-sky-300 hover:bg-sky-600 px-4 py-1 rounded-lg"
          onClick={() => setShowType("table")}
        >
          Modo Tabela
        </button>
        <button
          className="bg-sky-300 hover:bg-sky-600 px-4 py-1 rounded-lg"
          onClick={() => setShowType("card")}
        >
          Modo Card
        </button>
      </div>
      <div className="flex justify-between items-center">
        <h1 className="text-3xl my-8">Lista de Livros</h1>
        <Link to="/books/create">
          <MdOutlineAddBox className="text-sky-800 text-4xl" />
        </Link>
      </div>
      {loading ? (
        <Spinner /> // Exibe o componente Spinner enquanto estiver carregando
      ) : showType === "table" ? (
        <BooksTable books={books} /> // Exibe a tabela de livros
      ) : (
        <BooksCard books={books} /> // Exibe os cards de livros
      )}
    </div>
  );
};

export default Home;
