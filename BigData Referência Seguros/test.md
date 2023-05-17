const { Client } = require("pg");

const connectionString =
  "postgres://postgres:P@ssw0rd@127.0.0.1:5432/dbcompanies";
const client = new Client({
  connectionString: connectionString,
});

async function searchDatabase(filters) {
  try {
    await client.connect();

    const {
      cod_empresa,
      cnae,
      cnpj,
      razao_social,
      nome_fantasia,
      nome_socios,
      data_de_abertura,
      estado,
      cidade,
      bairro,
      situacao_cadastral,
      faturamento_e_colaboradores,
      capital_social,
      telefone,
      email,
      regime_tributario,
    } = filters;

    const query = `
      SELECT *
      FROM tblenterprises
      WHERE 
      cod_empresa = $1
        AND cnae = $2
        AND cnpj = $3
        AND razao_social = $4
        AND nome_fantasia = $5
        AND nome_socios = $6
        AND data_de_abertura = $7
        AND estado = $8
        AND cidade = $9
        AND bairro = $10
        AND situacao_cadastral = $11
        AND faturamento_e_colaboradores = $12
        AND capital_social = $13
        AND telefone = $14
        AND email = $15
        AND regime_tributario = $16
    `;

    const values = [
      cod_empresa,
      cnae,
      cnpj,
      razao_social,
      nome_fantasia,
      nome_socios,
      data_de_abertura,
      estado,
      cidade,
      bairro,
      situacao_cadastral,
      faturamento_e_colaboradores,
      capital_social,
      telefone,
      email,
      regime_tributario,
    ];

    const result = await client.query(query, values);

    console.log(result.rows.length + " resultados encontrados");
    return result.rows;
  } catch (err) {
    console.error(err);
  } finally {
    await client.end();
  }
}

const filters = {
  cnpj: "15.839.599/0001-29",
};

searchDatabase(filters)
  .then((result) => {
    console.log(result);
  })
  .catch((err) => {
    console.error(err);
  });