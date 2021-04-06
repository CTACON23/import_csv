import React, {useState} from 'react';
import { CSVReader } from 'react-papaparse';
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';

import Table from './Table/Table';
import {parseArrayFunction} from './parseArrayFunction.js';

const buttonRef = React.createRef();

export default function App() {
  const [candidats,setTableCandidates] = useState([])
  const [error,setError] = useState(false)


  const handleOpenDialog = (e) => {
    if (buttonRef.current) {
      buttonRef.current.open(e);
    }
  };

  const  handleOnFileLoad = (data) => {
    let isError = false;
    if(!(/^[Ff][Uu]([Ll]{2})\s[Nn][Aa][Mm][Ee]$/.test(Object.keys(data[0].data)[0]) && /^[Pp][Hh][Oo][Nn][Ee]$/.test(Object.keys(data[0].data)[1]) &&
          /^[Ee][Mm][Aa][Ii][Ll]$/.test(Object.keys(data[0].data)[2]))
      ){
        isError = true;
    }
    if(!isError){
      let candidatsData = data.map((el,index)=>{
        return Object.assign({'ID': index},el.data,{'Duplicate with': {ids:[]}}, {errors:[]});
      })
      candidatsData = parseArrayFunction(candidatsData)
      setTableCandidates(candidatsData)
      setError(isError)
    }else{
      setError(isError)
    }
    
  };

    return (
      <div className="App">
        {(error ?
          <div className="formatError">File format is not correct</div>
          :
          <>
            {(candidats.length !== 0 &&
              <Table data = {candidats}/>
            )}
          </>
        )}
        
        <div className="import">
          <CSVReader
            config={{
              header:true
            }}
            accept=".csv"
            ref={buttonRef}
            onFileLoad={handleOnFileLoad}
            noClick
            noDrag
          >
            {({ file }) => (
              <div>
                <button
                  type="button"
                  onClick={handleOpenDialog}
                  className="import__button"
                >
                  Import users
                </button>
              </div>
            )}
          </CSVReader>
        </div>
      </div>
    );
  }