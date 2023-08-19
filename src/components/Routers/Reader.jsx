import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';
import jsonData from '../../Files/roteiro-is.json';

function App() {
  const [inputText, setInputText] = useState('');
  const [parsedData, setParsedData] = useState([]);
  let previousTypeRecord = "";

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
    const parsedFields = [];
    let remainingText = text.trim();

    for (const key in jsonData) {

      if (jsonData.hasOwnProperty(key)) {
        const campos = jsonData[key];

        let typeRecord = remainingText.slice(0, 2);
        let sameRecord = true;

        while (sameRecord) {

          if(!(typeRecord === previousTypeRecord)){
            sameRecord = false;
          }

          let parsedFieldsCurrent = [];
          
          console.log("entrou")
          parsedFieldsCurrent = parseCampos(remainingText, campos);
          

          if (parsedFieldsCurrent.some((field) => field.valor.trim().length > 0)) {
            parsedFields.push(...parsedFieldsCurrent);
          }

          const nextLineStart = remainingText.indexOf('\n');
          if (nextLineStart === -1) {
            break; 
          }

          remainingText = remainingText.slice(nextLineStart + 1).trim();
        } 
      }
    }
  
    setParsedData(parsedFields);
  };
  
  const parseCampos = (text, campos) => {
    let remainingText = text;
    return campos.map((field) => {
      const nCaracteres = field.n_caracteres;
      previousTypeRecord = remainingText.slice(0, 2);
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
