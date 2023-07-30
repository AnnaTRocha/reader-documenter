import './css/Documenter.css';
import React, { useRef } from 'react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import dados from '../../Files/roteiro-is.json';

const Documenter = () => {
  const tableRef = useRef(null);

  const exportToPDF = () => {
    const doc = new jsPDF();

    Object.keys(dados).forEach((roteiroKey) => {
      const roteiro = dados[roteiroKey];

      doc.text(`${roteiroKey}`, 10, 10);

      const table = document.createElement("table");
      const thead = document.createElement("thead");
      const tbody = document.createElement("tbody");

      const headRow = document.createElement("tr");
      ["Campo", "Número de Caracteres", "Posição", "Observação"].forEach((headText) => {
        const th = document.createElement("th");
        th.textContent = headText;
        headRow.appendChild(th);
      });
      thead.appendChild(headRow);

      roteiro.forEach((item) => {
        const bodyRow = document.createElement("tr");
        ["campo", "n_caracteres", "posicao", "observacao"].forEach((field) => {
          const td = document.createElement("td");
          td.textContent = item[field];
          bodyRow.appendChild(td);
        });
        tbody.appendChild(bodyRow);
      });

      table.appendChild(thead);
      table.appendChild(tbody);

      doc.autoTable({ html : table});

      doc.addPage();
    });

    doc.save('table.pdf');
  };

  return (
    <body>
      {Object.keys(dados).map((roteiroKey) => {
        const roteiro = dados[roteiroKey];
        return (
          <div key={roteiroKey} className="table">
            <h2> {roteiroKey}</h2>
            <table className="table" ref={tableRef}>
              <thead>
                <tr>
                  <th>Campo</th>
                  <th>Número de Caracteres</th>
                  <th>Posição</th>
                  <th>Observação</th>
                </tr>
              </thead>
              <tbody>
                {roteiro.map((item, index) => (
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
      })}
      <button className="btn btn-primary" onClick={exportToPDF}>
        Exportar para PDF
      </button>
    </body>
  );
};

export default Documenter;
