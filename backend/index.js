import Express from "express"; // Importando o módulo Express
import { PORT, mongoDBURL } from "./config.js"; // Importando as constantes PORT e mongoDBURL do arquivo config.js
import mongoose from "mongoose"; // Importando o módulo mongoose
import booksRoute from "./routes/booksRoute.js"; // Importando o bookRouter
import { Book } from "./models/bookModel.js";
import cors from "cors"; // Importando o módulo cors

const app = Express(); // Criando uma instância do Express

app.use(Express.json()); // Habilitando o uso de JSON no Express

//middleware for handling CORS Policy
app.use(
  cors({
    origin: "http://localhost:3000", // Allow access from all domains
    method: ["GET", "POST", "PUT", "DELETE"], // Allow methods
    allowedHeaders: ["Content-Type"], // Allow headers
  })
);


app.get("/", (request, response) => {
  // Definindo uma rota GET para a raiz do servidor
  console.log(request); // Imprimindo o objeto request no console
  return response.status(234).send("Welcome to the MERN Stack application"); // Retornando uma resposta com o status 234 e uma mensagem
});

app.use('/books', booksRoute); // Definindo a rota base para o bookRouter

mongoose
  .connect(mongoDBURL) // Conectando ao banco de dados MongoDB usando a URL fornecida
  .then(() => {
    console.log("Connected to MongoDB"); // Imprimindo uma mensagem de sucesso no console
    app.listen(PORT, () => {
      console.log(`Server is running on PORT ${PORT}`); // Imprimindo a mensagem com o número da porta em que o servidor está sendo executado
    });
  })
  .catch((error) => {
    console.log(error); // Imprimindo a mensagem de erro no console
  });
