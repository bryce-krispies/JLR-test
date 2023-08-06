import React from "react";
import './Sidebar.css';
import Accordion from "react-bootstrap/Accordion";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

function Sidebar(props) {

    function columnChecked() {
        var columns = [...props.checkedColumns];
        for(var i = props.filterSpecs.column.length - 1; i>=0; i--) {
            var checkboxes = document.getElementsByName(props.filterSpecs.column[i]);
            for(var j = checkboxes.length - 1; j>=0; j--) {
                var index = columns.indexOf(checkboxes[j].id);
                if(checkboxes[j].checked && index === -1) {
                    columns.push(checkboxes[j].id);
                } else if(index !== -1 && !checkboxes[j].checked) {
                    columns.splice(index, 1);
                }
            }
        }
        props.setCheckedColumns(columns);
    }

    function cellChecked() {
        var cells = [...props.checkedCells];
        for(var i = props.filterSpecs.cell.length - 1; i>=0; i--) {
            var checkboxes = document.getElementsByName(props.filterSpecs.cell[i]);
            for(var j = checkboxes.length - 1; j>=0; j--) {
                var index = cells.indexOf(checkboxes[j].id);
                if(checkboxes[j].checked && index === -1) {
                    cells.push(checkboxes[j].id);
                } else if(index !== -1 && !checkboxes[j].checked) {
                    cells.splice(index, 1);
                }
            }
        }
        props.setCheckedCells(cells);
    }

    function vehicleIdChecked() {
        var vehicleIds = [...props.checkedVehicleIds];
        for(var i = props.filterSpecs.vehicle_id.length - 1; i>=0; i--) {
            var checkboxes = document.getElementsByName(props.filterSpecs.vehicle_id[i]);
            for(var j = checkboxes.length - 1; j>=0; j--) {
                var index = vehicleIds.indexOf(checkboxes[j].id);
                if(checkboxes[j].checked && index === -1) {
                    vehicleIds.push(checkboxes[j].id);
                } else if(index !== -1 && !checkboxes[j].checked) {
                    vehicleIds.splice(index, 1);
                }
            }
        }
        props.setCheckedVehicleIds(vehicleIds);
    }

    function driveTraceChecked() {
        var driveTraces = [...props.checkedDriveTraces];
        for(var i = props.filterSpecs.drive_trace.length - 1; i>=0; i--) {
            var checkboxes = document.getElementsByName(props.filterSpecs.drive_trace[i]);
            for(var j = checkboxes.length - 1; j>=0; j--) {
                var index = driveTraces.indexOf(checkboxes[j].id);
                if(checkboxes[j].checked && index === -1) {
                    driveTraces.push(checkboxes[j].id);
                } else if(index !== -1 && !checkboxes[j].checked) {
                    driveTraces.splice(index, 1);
                }
            }
        }
        props.setCheckedDriveTraces(driveTraces);
    }

    function iwrRangeChanged(type, value) {
        let temp = props.selectedIwrRange;
        switch(type) {
            case "enableSecondCond":
                temp.enableSecondCond = value;
                break;
            case "firstIneq":
                temp.firstIneq = value;
                break;
            case "firstIneqValue":
                temp.firstIneqValue = parseFloat(value);
                break;
            case "possibility":
                temp.possibility = value;
                break;
            case "secondIneq":
                temp.secondIneq = value;
                break;
            case "secondIneqValue":
                temp.secondIneqValue = parseFloat(value);
                break;
            default:
        }
        props.setSelectedIwrRange(JSON.parse(JSON.stringify(temp)))
    }

    function ColumnItem() {
        return (
            <Accordion.Item eventKey="0">
                <Accordion.Header><h5 style={{margin: "0"}}>Column</h5></Accordion.Header>
                <Accordion.Body>
                    {props.filterSpecs.column && props.filterSpecs.column.map((label)=>
                        <Form.Check name={label} onClick={(e) => columnChecked()} defaultChecked={props.checkedColumns.includes(label)} type="checkbox" id={label} label={label} key={label}/>
                    )}
                </Accordion.Body>
            </Accordion.Item>
        );
    }

    function DatetimeItem() {
        return (
            <Accordion.Item eventKey="1">
                <Accordion.Header><h5 style={{margin: "0"}}>Datetime Range</h5></Accordion.Header>
                <Accordion.Body>
                    <p style={{margin: "0", padding: "0 0 0.5rem 0"}}>Start</p>
                    <input
                        type="datetime-local"
                        style={{width: "100%"}}
                        defaultValue={props.selectedDateRange.startDate}
                        onChange={(e) => props.setSelectedDateRange({startDate: e.target.value, endDate: props.selectedDateRange.endDate})}
                    />
                    <p style={{margin: "0", padding: "1rem 0 0.5rem 0"}}>End</p>
                    <input
                        type="datetime-local"
                        style={{width: "100%"}}
                        defaultValue={props.selectedDateRange.endDate}
                        onChange={(e) => props.setSelectedDateRange({startDate: props.selectedDateRange.startDate, endDate: e.target.value})}
                    />
                </Accordion.Body>
            </Accordion.Item>
        );
    }

    function CellItem() {
        return (
            <Accordion.Item eventKey="2">
                <Accordion.Header><h5 style={{margin: "0"}}>Cell</h5></Accordion.Header>
                <Accordion.Body>
                    {props.filterSpecs.cell && props.filterSpecs.cell.map((label)=>
                        <Form.Check name={label} onClick={(e) => cellChecked()} defaultChecked={props.checkedCells.includes(label)} type="checkbox" id={label} label={label} key={label}/>
                    )}
                </Accordion.Body>
            </Accordion.Item>
        );
    }

    function VehicleIdItem() {
        return (
            <Accordion.Item eventKey="3">
                <Accordion.Header><h5 style={{margin: "0"}}>Vehicle ID</h5></Accordion.Header>
                <Accordion.Body>
                    {props.filterSpecs.vehicle_id && props.filterSpecs.vehicle_id.map((label)=>
                        <Form.Check name={label} onClick={(e) => vehicleIdChecked()} defaultChecked={props.checkedVehicleIds.includes(label)} type="checkbox" id={label} label={label} key={label}/>
                    )}
                </Accordion.Body>
            </Accordion.Item>
        );
    }

    function DriveTraceItem() {
        return (
            <Accordion.Item eventKey="4">
                <Accordion.Header><h5 style={{margin: "0"}}>Drive Trace</h5></Accordion.Header>
                <Accordion.Body>
                    {props.filterSpecs.drive_trace && props.filterSpecs.drive_trace.map((label)=>
                        <Form.Check name={label} onClick={(e) => driveTraceChecked()} defaultChecked={props.checkedDriveTraces.includes(label)} type="checkbox" id={label} label={label} key={label}/>
                    )}
                </Accordion.Body>
            </Accordion.Item>
        );
    }

    function IWRItem() {
        return (
            <Accordion.Item eventKey="7">
                <Accordion.Header><h5 style={{margin: "0"}}>IWR Range</h5></Accordion.Header>
                <Accordion.Body>
                    <Button
                        size="sm"
                        style={{margin: "0 0 0.25rem 0"}}
                        variant={props.selectedIwrRange.enableSecondCond ? "danger" : "success"}
                        onClick={(e) => iwrRangeChanged("enableSecondCond", !props.selectedIwrRange.enableSecondCond)}
                    >{props.selectedIwrRange.enableSecondCond ? "Disable Second Condition" : "Enable Second Condition"}</Button>
                    <Form.Select onChange={(e) => iwrRangeChanged("firstIneq", e.target.value)} defaultValue={props.selectedIwrRange.firstIneq}>
                        <option value="lt">Less Than</option>
                        <option value="lte">Less Than Or Equal To</option>
                        <option value="gt">Greater Than</option>
                        <option value="gte">Greater Than Or Equal To</option>
                    </Form.Select>
                    <Form.Control
                        type="number"
                        placeholder="Enter value"
                        style={{margin: "0.25rem 0"}}
                        defaultValue={props.selectedIwrRange.firstIneqValue}
                        onBlur={(e) => iwrRangeChanged("firstIneqValue", e.target.value)}
                    />
                    <div className={props.selectedIwrRange.enableSecondCond ? "" : "hide-element"}>
                        <Form.Check
                            inline
                            label="AND"
                            type="radio"
                            name="possibilityRadio"
                            value="and"
                            defaultChecked={props.selectedIwrRange.possibility === "and"}
                            onClick={(e) => iwrRangeChanged("possibility", e.target.value)}
                        />
                        <Form.Check
                            inline
                            label="OR"
                            type="radio"
                            name="possibilityRadio"
                            value="or"
                            defaultChecked={props.selectedIwrRange.possibility === "or"}
                            onClick={(e) => iwrRangeChanged("possibility", e.target.value)}
                        />
                        <Form.Select style={{margin: "0.25rem 0"}} onBlur={(e) => iwrRangeChanged("secondIneq", e.target.value)} defaultValue={props.selectedIwrRange.secondIneq}>
                            <option value="lt">Less Than</option>
                            <option value="lte">Less Than Or Equal To</option>
                            <option value="gt">Greater Than</option>
                            <option value="gte">Greater Than Or Equal To</option>
                        </Form.Select>
                        <Form.Control
                            type="number"
                            placeholder="Enter value"
                            defaultValue={props.selectedIwrRange.secondIneqValue}
                            onChange={(e) => iwrRangeChanged("secondIneqValue", e.target.value)}
                        />
                    </div>
                </Accordion.Body>
            </Accordion.Item>
        );
    }

    return (
        <div className="sidebar-container">
            <h2 style={{margin: "0 auto 0 auto", padding: "0 0 0.5rem 0"}}>Filter</h2>
            <Accordion style={{padding: "0 0 0.5rem 0"}}>
                <ColumnItem/>
                <DatetimeItem/>
                <CellItem/>
                <VehicleIdItem/>
                <DriveTraceItem/>
                <IWRItem/>
            </Accordion>
            <Button variant={props.removeDuplicates ? "success" : "danger"} onClick={() => props.setRemoveDuplicates(!props.removeDuplicates)}>{props.removeDuplicates ? "Bring Back Duplicates" : "Remove Duplicates"}</Button>
        </div>
    );
}

export default Sidebar;