import React, { useState } from 'react';
import _ from 'lodash';
import { main } from '@popperjs/core';

function App() {
  const [inputText, setInputText] = useState('');
  const [parsedData, setParsedData] = useState([]);

  const jsonData = {
    camposRegistro01: [
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
    ]
  };

  const handleInputChange = (event) => {
    const text = event.target.value;
    setInputText(text);

    const parsedFields = _.map(jsonData.camposRegistro01, (field) => {
      const startPos = parseInt(field.posicao.split('-')[0].trim()) - 1;
      const endPos = parseInt(field.posicao.split('-')[1].trim());

      return {
        campo: field.campo,
        valor: text.slice(startPos, endPos).trim()
      };
    });

    setParsedData(parsedFields);
  };

  return (
    <body>
      <div>
        <textarea
          rows="5"
          cols="50"
          value={inputText}
          onChange={handleInputChange}
          placeholder="Digite o texto aqui"
        />

        <div>
          {parsedData.map((field, index) => (
            <div key={index}>
              <strong>{field.campo}:</strong> {field.valor}
            </div>
          ))}
        </div>
      </div>
    </body>
  );
}

export default App;
