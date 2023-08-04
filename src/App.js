import React, { useEffect, useState } from 'react';
import './App.css';
import Sidebar from './components/Sidebar';
import Visualization from './components/Visualization';
import Papa from 'papaparse';
import csvFile from './CDTData.csv';

function App() {
  const [records, setRecords] = useState([]);

  useEffect(()=>{
    Papa.parse(csvFile, {
      download: true,
      header: true,
      complete: function (input) {
        setRecords(input.data);
      }
    });
  }, []);

  return (
    <div className="app">
      <Sidebar/>
      <Visualization records={records}/>
    </div>
  );
}

export default App;
