async function submitForm() {
    const cnae = document.getElementById('cnae').value;
    const razaoSocial = document.getElementById('razaoSocial').value;
    const nomeFantasia = document.getElementById('nomeFantasia').value;
    const dataAberturaInicio = document.getElementById('dataAberturaInicio').value;
    const dataAberturaFim = document.getElementById('dataAberturaFim').value;
    const estado = document.getElementById('estado').value;
    const cidade = document.getElementById('cidade').value;
    const bairro = document.getElementById('bairro').value;
    const situacaoCadastral = document.getElementById('situacaoCadastral').value;
    const faturamentoColaboradores = document.getElementById('faturamentoColaboradores').value;
    const capitalSocial = document.getElementById('capitalSocial').value;
    const matrizFiliais = document.getElementById('matrizFiliais').value;
    const porteEmpresa = document.getElementById('porteEmpresa').value;
  
    const params = [cnae, razaoSocial, nomeFantasia, dataAberturaInicio, dataAberturaFim, estado, cidade, bairro, situacaoCadastral, faturamentoColaboradores, capitalSocial, matrizFiliais, porteEmpresa];
  
    const client = new pg.Client(connectionString);
    await client.connect();
  
    const query = `
      SELECT * 
      FROM tblenterprises 
      WHERE cnae = $1
        AND razao_social = $2
        AND nome_fantasia = $3
        AND data_abertura BETWEEN $4 AND $5
        AND estado = $6
        AND cidade = $7
        AND bairro = $8
        AND situacao_cadastral = $9
        AND faturamento_colaboradores = $10
        AND capital_social = $11
        AND matriz_ou_filiais = $12
        AND porte_empresa = $13
    `;
  
    try {
      const result = await client.query(query, params);
      console.log(result.rows.length + " resultados encontrados");
    } catch (err) {
      console.error('Erro ao pesquisar no banco de dados:', err);
    } finally {
      await client.end();
    }
  }