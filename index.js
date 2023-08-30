// Importando Express
const express = require("express");
// Importando MongoDb
const { MongoClient } = require("mongodb");

// Conexão URL
// const url = "mongodb://localhost:27017";
const url = "mongodb://127.0.0.1:27017";
const client = new MongoClient(url);
// Database Name
const dbName = "jornada-backend-agosto-23";

async function main() {
  //Use o método connect para se conectar ao servidor
  console.info("Conectando ao banco de dados...");
  await client.connect();
  console.info("Banco de dados conectado com sucesso!");

  const db = client.db(dbName);
  const collection = db.collection("herois");

  const app = express();

  //Habilitamos o processamento de JSON
  app.use(express.json());

  //Endpoint principal
  app.get("/", function (req, res) {
    res.send("Hello, World");
  });

  //Endpoint /oi
  app.get("/oi", function (req, res) {
    res.send("Olá, mundo!");
  });

  // Endpoints de Herois
  const lista = ["Mulher Maravilha", "Capitã Marvel", "Homem de Ferro"];

  // Endpoint Read All -> [GET] /herois
  app.get("/herois", async function (req, res) {
    const itens = await collection.find().toArray();
    res.send(itens);
  });

  //Endpoint Create -> [POST] /herois
  app.post("/herois", function (req, res) {
    console.log(req.body, typeof req.body);

    //Extrai o nome do body da Request (corpo da requisição)
    const item = req.body.nome;

    //Inserir o item na lista
    lista.push(item);

    //Enviamos uma resposta de sucesso
    res.send("Item criado com sucesso!");
  });

  //Read By Id -> [GET] /herois/:id
  app.get("/herois/:id", function (req, res) {
    //Pegamos o parâmetro de rota ID
    const id = req.params.id - 1;

    //Peagmos a informação da lista
    const item = lista[id];

    //Exibimos o item na pesquisa do endpoint
    res.send(item);
  });

  //Update -> [PUT] /herois/:id
  app.put("/herois/:id", function (req, res) {
    //Pegamos o parâmetro de rota ID
    const id = req.params.id - 1;

    //Extrai o nome do body da Request (corpo da requisição)
    const item = req.body.nome;

    //Atualizamos a informação na lista de registro
    lista[id] = item;

    res.send("Item editado com sucesso");
  });

  //Delete -> [DELETE] /herois/:id
  app.delete("/herois/:id", function (req, res) {
    //Pegamos o parêmetro de rota Id
    const id = req.params.id - 1;

    //Excluir o item da lista
    delete lista[id];

    res.send("Item excluído com sucesso!");
  });

  app.listen(3000, () =>
    console.log("Servidor rodando em http://localhost:3000/")
  );
}
main();
