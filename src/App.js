import React, { useEffect, useState } from 'react';
import './App.css';
import Sidebar from './components/Sidebar';
import Visualization from './components/Visualization';
import Papa from 'papaparse';
import csvFile from './CDTData.csv';

function App() {
  const [record, setRecord] = useState([]);
  const [filtered, setFiltered] = useState([]);

  useEffect(()=>{
    Papa.parse(csvFile, {
      download: true,
      header: true,
      complete: function (input) {
        setRecord(input.data[0]);
        setFiltered(input.data);
      }
    });
  }, []);

  return (
    <div className="app">
      <Sidebar/>
      <Visualization record={record} filtered={filtered}/>
    </div>
  );
}

export default App;
