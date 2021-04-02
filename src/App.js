import React, {useState} from 'react';
import { CSVReader } from 'react-papaparse';

import Table from './Table/Table'

const buttonRef = React.createRef();

const setDuplicateWith = (array) => {
  for(let i =0; i< array.length; i++){
    for(let j = 0; j<array.length;j++){
      
      if(j < i && i !== j){
        if((array[i].Phone == array[j].Phone)){
          array[i]['Duplicate with']['context'] =  array[j]['Duplicate with']['context'] = 'phone'
          array[i]['Duplicate with']['ids'].push(array[j]['ID'])
          array[j]['Duplicate with']['ids'].push(array[i]['ID'])
        }else if((array[i].Email == array[j].Email)){
          array[i]['Duplicate with']['context'] =  array[j]['Duplicate with']['context'] = 'email'
          array[i]['Duplicate with']['ids'].push(array[j]['ID'])
          array[j]['Duplicate with']['ids'].push(array[i]['ID'])
        }
      }
    }
  }
  console.log(array)
  return array
}

export default function App() {
  const [candidats,setTableCandidates] = useState([])
  
  const handleOpenDialog = (e) => {
    if (buttonRef.current) {
      buttonRef.current.open(e);
    }
  };

  const handleOnFileLoad = (data) => {
    let candidatsData = data.map((el,index)=>{
      return Object.assign({ID: index},el.data,{'Duplicate with': {context:'',ids:[]}});
    })
    candidatsData = setDuplicateWith(candidatsData)
    setTableCandidates(candidatsData)
  };

    return (
      <>
        {candidats.length !== 0 && 
          <Table data = {candidats}/>
        }
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