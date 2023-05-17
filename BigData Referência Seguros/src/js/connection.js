const express = require("express");

const { Client } = require("pg");

const app = express();

app.use(express.json()); 

const connectionString =
  "postgres://-----------:--------@--------------/dbcompanies"; // for obvious reasons, I'm not going to put the ip, login and password here, but I'm able to access the server smoothly, that's not the problem.

app.post("/search", async (req, res) => {
  const client = new Client({
    connectionString: connectionString,
  });

  const {
    cnae,
    cnpj,
    razaoSocial,
    nomeFantasia,
    dataAberturaInicio,
    dataAberturaFim,
    estado,
    cidade,
    bairro,
    situacaoCadastral,
    faturamentoColaboradores,
    capitalSocial,
    matrizFiliais,
    porteEmpresa,
  } = req.body; 

  const query = `
      SELECT *
      FROM tblenterprises
      WHERE cnae = $1 AND cnpj = $2 AND razaoSocial = $3 AND nomeFantasia = $4 AND dataAbertura BETWEEN $5 AND $6
      AND estado = $7 AND cidade = $8 AND bairro = $9 AND situacaoCadastral = $10 AND faturamentoColaboradores = $11
      AND capitalSocial = $12 AND matrizFiliais = $13 AND porteEmpresa = $14
  `;

  const values = [
    cnae,
    cnpj,
    razaoSocial,
    nomeFantasia,
    dataAberturaInicio,
    dataAberturaFim,
    estado,
    cidade,
    bairro,
    situacaoCadastral,
    faturamentoColaboradores,
    capitalSocial,
    matrizFiliais,
    porteEmpresa,
  ];

  try {
    await client.connect();
    const result = await client.query(query, values);
    res.json(result.rows);
  } catch (err) {
    console.error("Erro ao pesquisar no banco de dados:", err);
    res.status(500).json({ error: "Erro ao pesquisar no banco de dados" });
  } finally {
    await client.end();
  }
});

app.listen(3000, () => {
  console.log("Servidor rodando na porta 3000");
});
