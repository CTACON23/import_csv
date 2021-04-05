import React, {useState} from 'react';
import { CSVReader } from 'react-papaparse';

import Table from './Table/Table'
import {parseArrayFunction} from './parseArrayFunction.js'

const buttonRef = React.createRef();

export default function App() {
  const [candidats,setTableCandidates] = useState([])
  const [error,setError] = useState(false)
  const handleOpenDialog = (e) => {
    if (buttonRef.current) {
      buttonRef.current.open(e);
    }
  };

  const handleOnFileLoad = (data) => {
    let candidatsData = data.map((el,index)=>{
      if(!(/^[Ff][Uu]([Ll]{2})\s[Nn][Aa][Mm][Ee]$/.test(Object.keys(el.data)[0]) && /^[Pp][Hh][Oo][Nn][Ee]$/.test(Object.keys(el.data)[1]) &&
          /^[Ee][Mm][Aa][Ii][Ll]$/.test(Object.keys(el.data)[2]))
      ){
        setError(true)
        return
      }
      return Object.assign({ID: index},el.data,{'Duplicate with': {ids:[]}}, {errors:[]});
    })
    if(error){
      candidatsData = parseArrayFunction(candidatsData)
      setTableCandidates(candidatsData)
    }
    
  };

    return (
      <>
        {(error ?
          <div>ERROR</div>
          :
          <>
            {(candidats.length !== 0 &&
              <Table data = {candidats}/>
            )}
          </>
        )}
        
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
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                marginBottom: 10,
              }}
            >
              <button
                type="button"
                onClick={handleOpenDialog}
                style={{
                  borderRadius: 0,
                  marginLeft: 0,
                  marginRight: 0,
                  paddingLeft: 0,
                  paddingRight: 0,
                  backgroundColor:'#91c47d',
                  border:'2px solid green',
                  color:'white',
                  width:'200px',
                  height:'50px'
                }}
              >
                Import users
              </button>
            </div>
          )}
        </CSVReader>
      </>
    );
  }