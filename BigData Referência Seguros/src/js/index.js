import "./connection.js";

async function getFormValues() {
 await document
    .querySelector("#button")
    .addEventListener("click", searchDatabase);
  return {
    cnae: document.getElementById("cnae").value,
    cnpj: document.getElementById("cnpj").value,
    razaoSocial: document.getElementById("razaoSocial").value,
    nomeFantasia: document.getElementById("nomeFantasia").value,
    dataAberturaInicio: document.getElementById("dataAberturaInicio").value,
    dataAberturaFim: document.getElementById("dataAberturaFim").value,
    estado: document.getElementById("estado").value,
    cidade: document.getElementById("cidade").value,
    bairro: document.getElementById("bairro").value,
    situacaoCadastral: document.getElementById("situacaoCadastral").value,
    faturamentoColaboradores: document.getElementById(
      "faturamentoColaboradores"
      ).value,
      capitalSocial: document.getElementById("capitalSocial").value,
      matrizFiliais: document.getElementById("matrizFiliais").value,
      porteEmpresa: document.getElementById("porteEmpresa").value,
    };
  }
  
  async function searchDatabase() {
    const values = getFormValues();
    try {
      const response = await fetch("/search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const result = await response.json();
      console.log(result.rows.length + "Pesquisa feita com sucesso");
    } catch (err) {
      console.error("Erro ao pesquisar no banco de dados:", err);
  }
}

