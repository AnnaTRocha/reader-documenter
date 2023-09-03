import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';
import jsonData from '../../Files/roteiro-is.json';
import './css/Reader.css';

function App() {
  const [inputText, setInputText] = useState('');
  const [parsedData, setParsedData] = useState([]);
  let previousTypeRecord = ""
  let typeRecord = "";

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

  const handleInputChange = (text) => {

    const parsedAlreadyFields = [];
    const lines = text.split('\n');

    lines.forEach((line) => {
      const trimmedLine = line.trim();
      const typeRecord = trimmedLine.slice(0, 2);

      if (jsonData.hasOwnProperty(typeRecord)) {
        const mold = jsonData[typeRecord];
        let parsedFieldsCurrent = [];
          
        parsedFieldsCurrent = parseFields(trimmedLine, mold);

        if (parsedFieldsCurrent.some((field) => field.valor.trim().length > 0)) {
          parsedAlreadyFields.push(...parsedFieldsCurrent);
        }
      } else {
        console.log('Molde não encontrado para:', typeRecord);
      }
    });
    setParsedData(parsedAlreadyFields);
  };
  
  const parseFields = (text, campos) => {
    let remainingText = text;
    previousTypeRecord = remainingText.slice(0, 2).trim();
    return campos.map((field) => {
      const nCaracteres = field.n_caracteres;
      const valor = remainingText.slice(0, nCaracteres).trim();
      remainingText = remainingText.slice(nCaracteres); 
      return {
        campo: field.campo,
        valor: valor
      };
    });
  };

  return (
    <body>
      <div>
        <div {...getRootProps()} class="dropzone">
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

export default App;
