import React, { useState } from 'react';
import _ from 'lodash';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';

function App() {
  const [inputText, setInputText] = useState('');
  const [parsedData, setParsedData] = useState([]);

  const onDrop = (files) => {
    const formData = new FormData();
    formData.append('file', files[0]);

    const reader = new FileReader();

    reader.onload = (event) => {
      const text = event.target.result;
      setInputText(text);

      handleInputChange(text);
      
      axios.post('http://localhost:5000/api/upload', formData)
        .then((response) => {
          console.log('Arquivo enviado com sucesso:', response.data);
        })
        .catch((error) => {
          console.error('Erro ao enviar arquivo:', error);
        });
    };

    reader.readAsText(files[0]);
  };  

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

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

  const handleInputChange = (text) => {
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
        <div {...getRootProps()} style={styles.dropzone}>
          <input {...getInputProps()} />
          {isDragActive ? <p>Drop the file here ...</p> : <p>Drag and drop a file here, or click to select a file</p>}
        </div>

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

const styles = {
  dropzone: {
    width: '100%',
    height: '200px',
    border: '2px dashed #ccc',
    borderRadius: '4px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    textAlign: 'center',
    fontSize: '18px',
    color: '#555',
  },
};

export default App;
