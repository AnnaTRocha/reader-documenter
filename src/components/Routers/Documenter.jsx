import './css/Documenter.css';
import React, { useRef } from 'react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import jsonData from '../../Files/roteiro-is.json';

const Documenter = () => {
  const tableRef = useRef(null);

  const calculatePosition = (index, campos) => {
    let startPos = 1;
    for (let i = 0; i < index; i++) {
      startPos += campos[i].n_caracteres;
    }
    const endPos = startPos + campos[index].n_caracteres - 1;
    return `${startPos.toString().padStart(3, '0')} - ${endPos.toString().padStart(3, '0')}`;
  };

  const exportToPDF = () => {
    const doc = new jsPDF();

    Object.keys(jsonData).forEach((roteiroKey) => {
      const roteiro = jsonData[roteiroKey];

      doc.text(`${roteiroKey}`, 10, 10);

      const table = document.createElement('table');
      const thead = document.createElement('thead');
      const tbody = document.createElement('tbody');

      const headRow = document.createElement('tr');
      ['Campo', 'Número de Caracteres', 'Observação', 'Posição'].forEach((headText) => {
        const th = document.createElement('th');
        th.textContent = headText;
        headRow.appendChild(th);
      });
      thead.appendChild(headRow);

      roteiro.forEach((item, index) => {
        const bodyRow = document.createElement('tr');
        ['campo', 'n_caracteres', 'observacao'].forEach((field) => {
          const td = document.createElement('td');
          td.textContent = item[field];
          bodyRow.appendChild(td);
        });

        const tdPosicao = document.createElement('td');
        tdPosicao.textContent = calculatePosition(index, roteiro);
        bodyRow.appendChild(tdPosicao);

        tbody.appendChild(bodyRow);
      });

      table.appendChild(thead);
      table.appendChild(tbody);

      doc.autoTable({ html: table });

      doc.addPage();
    });

    doc.save('table.pdf');
  };

  return (
    <body>
      {Object.keys(jsonData).map((roteiroKey) => {
        const roteiro = jsonData[roteiroKey];
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
