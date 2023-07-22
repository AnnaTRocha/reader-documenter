import React, { useState, Fragment } from 'react';
import _ from 'lodash';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';
import jsonData from '../../Files/roteiro-is.json';
import { Combobox, Transition } from '@headlessui/react';

const people = [
  { id: 1, name: 'Durward Reynolds' },
  { id: 2, name: 'Kenton Towne' },
  { id: 3, name: 'Therese Wunsch' },
  { id: 4, name: 'Benedict Kessler' },
  { id: 5, name: 'Katelyn Rohan' },
];

function App() {
  const [inputText, setInputText, ] = useState('');
  const [parsedData, setParsedData] = useState([]);
  const [selectedPerson, setSelectedPerson] = useState(people[0]);
  const [query, setQuery] = useState('');
  const [files, setFiles] = useState([]);

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

  const filteredPeople =
  query === '' || !people
    ? people
    : people.filter((person) =>
        person && person.name
          ? person.name
              .toLowerCase()
              .replace(/\s+/g, '')
              .includes(query.toLowerCase().replace(/\s+/g, ''))
          : false
      );


  return (
    <body>
      <div>
        <div className="fixed top-16 w-72">
        <Combobox value={selectedPerson} onChange={setSelectedPerson}>
          <Combobox.Input onChange={(event) => setQuery(event.target.value)} />
          <Combobox.Options>
            {filteredPeople.map((person) => (
              <Combobox.Option key={person.name} value={person.name}>
                {person.name}
              </Combobox.Option>
            ))}
          </Combobox.Options>
        </Combobox>
        </div>
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
