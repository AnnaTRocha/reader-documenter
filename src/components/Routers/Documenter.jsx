import './css/Documenter.css';
import React, { useRef } from 'react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import dados from '../../Files/roteiro-is.json';

const Documenter = () => {
  const tableRef = useRef(null);

  const exportToPDF = () => {
    const table = tableRef.current;
    const doc = new jsPDF();

    doc.autoTable({ html: table });

    doc.save('table.pdf');
  };

  return (
    <body>
      {Object.keys(dados).map((roteiroKey) => {
        const roteiro = dados[roteiroKey];
        return (
          <div key={roteiroKey} className="table">
            <h2>Roteiro: {roteiroKey}</h2>
            <table className="table" ref={tableRef}>
              <thead>
                <tr>
                  <th>Campo</th>
                  <th>Número de Caracteres</th>
                  <th style={{ width: '100px' }}>Posição</th>
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
