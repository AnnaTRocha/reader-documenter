import React from 'react';

const Documenter = () => {
  const dados = [
    {
      campo: "Campo1",
      n_caracteres: 1,
      posicao: "001 - 001",
      observacao: "Campo Fixo"
    },
    {
      campo: "Campo2",
      n_caracteres: 2,
      posicao: "002 - 006",
      observacao: "Campo Fixo"
    },
    {
      campo: "Campo3",
      n_caracteres: 9,
      posicao: "007 - 020",
      observacao: "descrição tal"
    },
    {
      campo: "Campo4",
      n_caracteres: 25,
      posicao: "021 - 038",
      observacao: "descrição qualquer"
    }
  ];

  return (
    <div>
      <h1>Tabela JSON</h1>
      <table>
        <thead>
          <tr>
            <th>Campo</th>
            <th>Número de Caracteres</th>
            <th>Posição</th>
            <th>Observação</th>
          </tr>
        </thead>
        <tbody>
          {dados.map((item, index) => (
            <tr key={index}>
              <td>{item.campo}</td>
              <td>{item.n_caracteres}</td>
              <td>{item.posicao}</td>
              <td>{item.observacao}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Documenter;
