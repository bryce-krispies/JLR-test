import React, { useEffect, useState } from 'react';
import './App.css';
import Sidebar from './components/Sidebar';
import Visualization from './components/Visualization';
import Papa from 'papaparse';
import csvFile from './CDTData.csv';

function App() {
  const [filterSpecs, setFilterSpecs] = useState([]);
  const [checkedColumns, setCheckedColumns] = useState([]);
  const [checkedCells, setCheckedCells] = useState([]);
  const [records, setRecords] = useState([]);

  useEffect(()=>{
    Papa.parse(csvFile, {
      download: true,
      header: true,
      complete: function (input) {
        let temp = {
          column: [],
          cell: [],
          vehicle_id: [],
          drive_trace: [],
          engineer: [],
          driver: [],
          iwr: [],
          rmsse: [],
          total_co_gkm: [],
          total_co2_gkm: []
        };

        input.data.forEach((test) => {
          if (!temp.cell.includes(test['Cell'])) temp.cell.push(test['Cell']);
          if (!temp.vehicle_id.includes(test['VehicleID'])) temp.vehicle_id.push(test['VehicleID']);
          if (!temp.drive_trace.includes(test['DriveTrace'])) temp.drive_trace.push(test['DriveTrace']);
          if (!temp.engineer.includes(test['Engineer'])) temp.engineer.push(test['Engineer']);
          if (!temp.driver.includes(test['Driver'])) temp.driver.push(test['Driver']);
          temp.iwr.push(parseFloat(test['IWR']));
          temp.rmsse.push(parseFloat(test['RMSSE']));
          temp.total_co_gkm.push(parseFloat(test['TotalCOgkm']));
          temp.total_co2_gkm.push(parseFloat(test['TotalCO2gkm']));
        });
        
        temp.column = Object.keys(input.data[0]);
        temp.cell.sort();
        temp.vehicle_id.sort();
        temp.drive_trace.sort();
        temp.engineer.sort();
        temp.driver.sort();
        temp.iwr = [Math.min(...temp.iwr), Math.max(...temp.iwr)];
        temp.rmsse = [Math.min(...temp.rmsse), Math.max(...temp.rmsse)];
        temp.total_co_gkm = [Math.min(...temp.total_co_gkm), Math.max(...temp.total_co_gkm)];
        temp.total_co2_gkm = [Math.min(...temp.total_co2_gkm), Math.max(...temp.total_co2_gkm)];
        
        setRecords(input.data);
        setFilterSpecs(JSON.parse(JSON.stringify(temp)));
        setCheckedColumns(JSON.parse(JSON.stringify(Object.keys(input.data[0]))));
        setCheckedCells(JSON.parse(JSON.stringify(temp.cell)));
      }
    });
  }, []);

  return (
    <div className="app">
      <Sidebar
        filterSpecs={filterSpecs}
        checkedColumns={checkedColumns} setCheckedColumns={setCheckedColumns}
        checkedCells={checkedCells} setCheckedCells={setCheckedCells}
      />
      <div style={{height: "100%", width: "1px", backgroundColor: "black"}}/>
      <Visualization
        records={records}
        checkedColumns={checkedColumns}
        checkedCells={checkedCells}
      />
    </div>
  );
}

export default App;
