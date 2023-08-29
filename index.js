const express = require("express");
const app = express();

//Habilitamos o processamento de JSON
app.use(express.json());

//Endpoint principal
app.get("/", function (req, res) {
  res.send("Hello, World");
});

//Endpoint /oi
app.get("/oi123", function (req, res) {
    res.send("Olá, mundo!");
  });

// Endpoints de Herois
const lista = ["Mulher Maravilha", "Capitã Marvel", "Homem de Ferro"];

// Endpoint Read All -> [GET] /herois
app.get("/herois", function (req, res) {
  res.send(lista)
});

//Endpoint Create -> [POST] /herois
app.post("/herois", function (req, res) {
  console.log(req.body, typeof req.body);

  //Extrai o nome do body da Request (corpo da requisição)
  const item = req.body.nome;

  //Inserir o item na lista
  lista.push(item);

  //Enviamos uma resposta de sucesso
  res.send("Item criado com sucesso!")
});


app.listen(3000, () =>
  console.log("Servidor rodando em http://localhost:3000/")
);
