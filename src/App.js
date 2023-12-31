import React, { useEffect, useState } from 'react';
import './App.css';
import Sidebar from './components/Sidebar';
import Visualization from './components/Visualization';
import Papa from 'papaparse';
import csvFile from './CDTData.csv';

function App() {
  // state variables
  const [records, setRecords] = useState([]);
  const [filterSpecs, setFilterSpecs] = useState([]);
  const [selectedDateRange, setSelectedDateRange] = useState({});
  const [checkedColumns, setCheckedColumns] = useState([]);
  const [checkedCells, setCheckedCells] = useState([]);
  const [checkedVehicleIds, setCheckedVehicleIds] = useState([]);
  const [checkedDriveTraces, setCheckedDriveTraces] = useState([]);
  const [checkedEngineers, setCheckedEngineers] = useState([]);
  const [checkedDrivers, setCheckedDrivers] = useState([]);
  const [selectedIwrRange, setSelectedIwrRange] = useState({});
  const [selectedRmsseRange, setSelectedRmsseRange] = useState({});
  const [selectedTotalCoRange, setSelectedTotalCoRange] = useState({});
  const [selectedTotalCo2Range, setSelectedTotalCo2Range] = useState({});
  const [removeDuplicates, setRemoveDuplicates] = useState(false);

  useEffect(()=>{
    Papa.parse(csvFile, {
      download: true,
      header: true,
      complete: function (input) {
        let temp = {
          date: [],
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

        // pre-process data
        input.data.forEach((test) => {
          let splitDatetime = test['TestDateTime'].split("/");
          temp.date.push(new Date(splitDatetime[1]+"/"+splitDatetime[0]+"/"+splitDatetime[2]));
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
        temp.date = [new Date(Math.min(...temp.date)), new Date(Math.max(...temp.date))];
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
        temp.reset_iwr = {enableSecondCond: false, firstIneq: "gte", firstIneqValue: temp.iwr[0], possibility: "and", secondIneq: "lte", secondIneqValue: temp.iwr[1]}
        temp.reset_rmsse = {enableSecondCond: false, firstIneq: "gte", firstIneqValue: temp.rmsse[0], possibility: "and", secondIneq: "lte", secondIneqValue: temp.rmsse[1]};
        temp.reset_co = {enableSecondCond: false, firstIneq: "gte", firstIneqValue: temp.total_co_gkm[0], possibility: "and",secondIneq: "lte", secondIneqValue: temp.total_co_gkm[1]};
        temp.reset_co2 = {enableSecondCond: false, firstIneq: "gte", firstIneqValue: temp.total_co2_gkm[0], possibility: "and", secondIneq: "lte", secondIneqValue: temp.total_co2_gkm[1]};
        temp.reset_date = {
          startDate: temp.date[0].getFullYear() +"-" +(temp.date[0].getMonth()+1).toString().padStart(2, '0') 
            +"-" +temp.date[0].getDate().toString().padStart(2, '0') +"T" +temp.date[0].getHours().toString().padStart(2, '0')
            +":" +temp.date[0].getMinutes().toString().padStart(2, '0'),
          endDate: temp.date[1].getFullYear() +"-" +(temp.date[1].getMonth()+1).toString().padStart(2, '0')
            +"-" +temp.date[1].getDate().toString().padStart(2, '0') +"T" +temp.date[1].getHours().toString().padStart(2, '0')
            +":" +temp.date[1].getMinutes().toString().padStart(2, '0')};

        //set variables for initial state
        setRecords(input.data);
        setFilterSpecs(JSON.parse(JSON.stringify(temp)));
        setSelectedDateRange(JSON.parse(JSON.stringify({
          startDate: temp.date[0].getFullYear() +"-" +(temp.date[0].getMonth()+1).toString().padStart(2, '0') 
            +"-" +temp.date[0].getDate().toString().padStart(2, '0') +"T" +temp.date[0].getHours().toString().padStart(2, '0')
            +":" +temp.date[0].getMinutes().toString().padStart(2, '0'),
          endDate: temp.date[1].getFullYear() +"-" +(temp.date[1].getMonth()+1).toString().padStart(2, '0')
            +"-" +temp.date[1].getDate().toString().padStart(2, '0') +"T" +temp.date[1].getHours().toString().padStart(2, '0')
            +":" +temp.date[1].getMinutes().toString().padStart(2, '0')})));
        setCheckedColumns(JSON.parse(JSON.stringify(temp.column)));
        setCheckedCells(JSON.parse(JSON.stringify(temp.cell)));
        setCheckedVehicleIds(JSON.parse(JSON.stringify(temp.vehicle_id)));
        setCheckedDriveTraces(JSON.parse(JSON.stringify(temp.drive_trace)));
        setCheckedEngineers(JSON.parse(JSON.stringify(temp.engineer)));
        setCheckedDrivers(JSON.parse(JSON.stringify(temp.driver)));
        setSelectedIwrRange(JSON.parse(JSON.stringify({
          enableSecondCond: false, firstIneq: "gte", firstIneqValue: temp.iwr[0],
          possibility: "and", secondIneq: "lte", secondIneqValue: temp.iwr[1]})));
        setSelectedRmsseRange(JSON.parse(JSON.stringify({
          enableSecondCond: false, firstIneq: "gte", firstIneqValue: temp.rmsse[0],
          possibility: "and", secondIneq: "lte", secondIneqValue: temp.rmsse[1]})));
        setSelectedTotalCoRange(JSON.parse(JSON.stringify({
          enableSecondCond: false, firstIneq: "gte", firstIneqValue: temp.total_co_gkm[0],
          possibility: "and",secondIneq: "lte", secondIneqValue: temp.total_co_gkm[1]})));
        setSelectedTotalCo2Range(JSON.parse(JSON.stringify({
          enableSecondCond: false, firstIneq: "gte", firstIneqValue: temp.total_co2_gkm[0],
          possibility: "and", secondIneq: "lte", secondIneqValue: temp.total_co2_gkm[1]})));
      }
    });
  }, []);

  return (
    <div className="app">
      <Sidebar
        filterSpecs={filterSpecs}
        checkedColumns={checkedColumns}               setCheckedColumns={setCheckedColumns}
        selectedDateRange={selectedDateRange}         setSelectedDateRange={setSelectedDateRange}
        checkedCells={checkedCells}                   setCheckedCells={setCheckedCells}
        checkedVehicleIds={checkedVehicleIds}         setCheckedVehicleIds={setCheckedVehicleIds}
        checkedDriveTraces={checkedDriveTraces}       setCheckedDriveTraces={setCheckedDriveTraces}
        checkedEngineers={checkedEngineers}           setCheckedEngineers={setCheckedEngineers}
        checkedDrivers={checkedDrivers}               setCheckedDrivers={setCheckedDrivers}
        selectedIwrRange={selectedIwrRange}           setSelectedIwrRange={setSelectedIwrRange}
        selectedRmsseRange={selectedRmsseRange}       setSelectedRmsseRange={setSelectedRmsseRange}
        selectedTotalCoRange={selectedTotalCoRange}   setSelectedTotalCoRange={setSelectedTotalCoRange}
        selectedTotalCo2Range={selectedTotalCo2Range} setSelectedTotalCo2Range={setSelectedTotalCo2Range}
        removeDuplicates={removeDuplicates}           setRemoveDuplicates={setRemoveDuplicates}
      />
      <Visualization
        records={records}
        checkedColumns={checkedColumns}
        selectedDateRange={selectedDateRange}
        checkedCells={checkedCells}
        checkedVehicleIds={checkedVehicleIds}
        checkedDriveTraces={checkedDriveTraces}
        checkedEngineers={checkedEngineers}
        checkedDrivers={checkedDrivers}
        selectedIwrRange={selectedIwrRange}
        selectedRmsseRange={selectedRmsseRange}
        selectedTotalCoRange={selectedTotalCoRange}
        selectedTotalCo2Range={selectedTotalCo2Range}
        removeDuplicates={removeDuplicates}
      />
    </div>
  );
}

export default App;
