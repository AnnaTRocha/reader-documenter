import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';
import jsonData from '../../Files/roteiro-is.json';

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

  const handleInputChange = (text) => {
    const imoveis = {};
    let remainingText = text.trim();
    let isHeaderProcessed = false;
    let headerData = {};

    while(remainingText.length > 0){
      console.log(remainingText)
      let endFile = false;
      for (const key in jsonData) {
      
        if (jsonData.hasOwnProperty(key)) {
          const campos = jsonData[key];
          const primeiroCampo = campos[0];
  
          if (!isHeaderProcessed) {
            const headerStartPosition = parseInt(primeiroCampo.posicao.split('-')[0].trim()) - 1;
            if (remainingText.length >= headerStartPosition + primeiroCampo.n_caracteres) {
              console.log("header")
              headerData = parseCampos(remainingText.slice(headerStartPosition, headerStartPosition + primeiroCampo.n_caracteres), campos);
              isHeaderProcessed = true;
              console.log(headerData)
    
              remainingText = remainingText.slice(headerStartPosition + primeiroCampo.n_caracteres);
    
              continue;
            }
          } else if (key === "header") {
             continue;
          }
  
          let isRegistro01 = remainingText.trim().substring(0, 3) === "A01";
          let isRegistro02 = remainingText.trim().substring(0, 2) === "02";
          let isRegistro03 = remainingText.trim().substring(0, 2) === "03";
          let isRegistro04 = remainingText.trim().substring(0, 2) === "04";
          let isRegistro05 = remainingText.trim().substring(0, 2) === "05";
          let isRegistro06 = remainingText.trim().substring(0, 2) === "06";
          let isRegistro07 = remainingText.trim().substring(0, 2) === "07";
          let isRegistro08 = remainingText.trim().substring(0, 2) === "08";
          let isRegistro09 = remainingText.trim().substring(0, 2) === "09";
          let isRegistro10 = remainingText.trim().substring(0, 2) === "10";
          let isRegistro11 = remainingText.trim().substring(0, 2) === "11";
            
          const matriculaImovel = remainingText.substring(4, 13);
          const nextLineStart = remainingText.indexOf('\n');
          
          const parsedFieldsCurrent = parseCampos(remainingText, campos);
  
          if (isRegistro01) {
            console.log("OUTRO IMOVEL")
            imoveis[matriculaImovel] = parsedFieldsCurrent;                                
          } else if(isRegistro03 || isRegistro10) {
            while(isRegistro03 || isRegistro10){
              isRegistro03 = remainingText.trim().substring(0, 2) === "03";
              isRegistro10 = remainingText.trim().substring(0, 2) === "10";
              console.log("ENTROU NO WHILE ", isRegistro03 || isRegistro10)

              if(isRegistro03 || isRegistro10){
                const parsedFieldsCurrent = parseCampos(remainingText, campos);
                console.log(parsedFieldsCurrent)
                imoveis[matriculaImovel] = imoveis[matriculaImovel] || [];
                imoveis[matriculaImovel].push(...parsedFieldsCurrent);
                remainingText = remainingText.slice(nextLineStart + 1).trim();
              } else {
                break;
              }
            }
            continue;
          } else {
            console.log(parsedFieldsCurrent)
            imoveis[matriculaImovel] = imoveis[matriculaImovel] || [];
            imoveis[matriculaImovel].push(...parsedFieldsCurrent);
          }

          if (nextLineStart === -1 || nextLineStart >= remainingText.length - 1) {
            endFile = true;
            break;
          }
        
          remainingText = remainingText.slice(nextLineStart + 1).trim();

          const nextImovelCampos = jsonData[key + 1];
          if (nextImovelCampos && nextImovelCampos.some((field) => remainingText.startsWith(field.posicao))) {
            endFile = true;
            break;
          }
        }
      }

      if (endFile) {
        break;
      }
    }

    // Transforma o objeto de imóveis em um array de arrays
    const imoveisArray = Object.values(imoveis);

    setParsedData(imoveisArray);
  };

  const parseCampos = (text, campos) => {
    return campos.map((field) => {
      const startPos = parseInt(field.posicao.split('-')[0].trim()) - 1;
      const endPos = parseInt(field.posicao.split('-')[1].trim());

      const valor = text.slice(startPos, endPos).trim();
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
          {parsedData.map((imovel, index) => (
            <div key={index}>
              {imovel.map((field, index) => (
                <div key={index}>
                  <strong>{field.campo}:</strong> {field.valor}
                </div>
              ))}
              <hr />
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
