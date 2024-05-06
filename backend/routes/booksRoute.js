import express from "express"; // Importando o express
import { Book } from "../models/bookModel.js"; // Importando o modelo Book

const router = express.Router(); // Criando uma instância do express

// Criando um método para salvar um novo livro



router.post('/', async (request, response) => {
  // Definindo uma rota POST para "/book"
  try {
    if (
      !request.body.title ||
      !request.body.author ||
      !request.body.publishYear
    ) {
      return response.status(400).send({
        message: "Send all required fields: title, author, publishYear",
      });
    }
    const newBook = {
      title: request.body.title,
      author: request.body.author,
      publishYear: request.body.publishYear,
    };
    const book = await Book.create(newBook); // Criando um novo livro usando o modelo Book e os dados fornecidos na requisição
    return response.status(201).send(book); // Retornando uma resposta com o status 201 e o livro criado
  } catch (error) {
    console.log(error.message); // Imprimindo a mensagem de erro no console
    return response.status(500).send({ message: error.message }); // Retornando uma resposta com o status 500 e a mensagem de erro
  }
});
//Definindo uma rota GET para "/books para pegar todos os livros"
router.get('/', async (request, response) => {
  try {
    const books = await Book.find({}); // Buscando todos os livros no banco de dados
    return response.status(200).json({
      count: books.length,
      data: books,
    }); // Retornando uma resposta com o status 200 e a lista de livros
  } catch (error) {
    console.log(error.message);
    return response.status(500).send({ message: error.message });
  }
}),
  // Definindo uma rota GET para "/books" para pegar por ID
router.get('/:id', async (request, response) => {
    try {
      const { id } = request.params; // Obtendo o ID do livro da requisição

      const book = await Book.findById(id); // Buscando todos os livros no banco de dados
      return response.status(200).json(book); // Retornando uma resposta com o status 200 e a lista de livros
    } catch (error) {
      console.log(error.message);
      return response.status(500).send({ message: error.message });
    }
  }),
// Definindo uma rota PUT para "/books/:id" para atualizar um livro
router.put('/:id', async (request, response) => {
    try {
      if (
        // Verificando se todos os campos obrigatórios foram enviados na requisição)
        !request.body.title ||
        !request.body.author ||
        !request.body.publishYear
      ) {
        return response.status(400).send({
          message: "Send all required fields: title, author, publishYear",
        });
      }
      const { id } = request.params; // Obtendo o ID do livro da requisição

      const result = await Book.findByIdAndUpdate(id, request.body); // Atualizando o livro com os dados fornecidos na requisição

      if (!result) {
        return response.status(404).send({ message: "Book not found" }); // Retornando uma resposta com o status 404 e a mensagem de erro
      }
      return response
        .status(200)
        .send({ message: "Book updated successfully" }); // Retornando uma resposta com o status 200 e a mensagem de sucesso
    } catch (error) {
      console.log(error.message);
      return response.status(500).send({ message: error.message });
    }
  });

// Route to delete a book
router.delete('/:id', async (request, response) => {
  try {
    const { id } = request.params; // Obtendo o ID do livro da requisição

    const result = await Book.findByIdAndDelete(id); // Deletando o livro com o ID fornecido na requisição

    if (!result) {
      return response.status(404).send({ message: "Book not found" }); // Retornando uma resposta com o status 404 e a mensagem de erro
    }
    return response.status(200).send({ message: "Book deleted successfully" }); // Retornando uma resposta com o status 200 e a mensagem de sucesso
  } catch (error) {
    console.log(error.message);
    return response.status(500).send({ message: error.message });
  }
});

export default router; // Exportando o router