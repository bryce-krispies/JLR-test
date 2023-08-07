import React from "react";
import './Sidebar.css';
import Accordion from "react-bootstrap/Accordion";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

function Sidebar(props) {

    function itemChecked(initialCheckedItems, specs, setCheckedItems) {
        var checkedItems = [...initialCheckedItems];
        for (var i = specs.length -1; i >= 0; i--) {
            var checkboxes = document.getElementsByName(specs[i]);
            for(var j = checkboxes.length - 1; j>=0; j--) {
                var index = checkedItems.indexOf(checkboxes[j].id);
                if(checkboxes[j].checked && index === -1) {
                    checkedItems.push(checkboxes[j].id);
                } else if(index !== -1 && !checkboxes[j].checked) {
                    checkedItems.splice(index, 1);
                }
            }
        }
        setCheckedItems(checkedItems);
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

    function rmsseRangeChanged(type, value) {
        let temp = props.selectedRmsseRange;
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
        props.setSelectedRmsseRange(JSON.parse(JSON.stringify(temp)))
    }

    function ColumnItem() {
        return (
            <Accordion.Item eventKey="0">
                <Accordion.Header><h5 style={{margin: "0"}}>Column</h5></Accordion.Header>
                <Accordion.Body>
                    {props.filterSpecs.column && props.filterSpecs.column.map((label)=>
                        <Form.Check
                            name={label} type="checkbox" id={label} label={label} key={label}
                            onClick={(e) => itemChecked(props.checkedColumns, props.filterSpecs.column, props.setCheckedColumns)}
                            defaultChecked={props.checkedColumns.includes(label)}
                        />
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
                        <Form.Check
                            name={label} type="checkbox" id={label} label={label} key={label}
                            onClick={(e) => itemChecked(props.checkedCells, props.filterSpecs.cell, props.setCheckedCells)}
                            defaultChecked={props.checkedCells.includes(label)}
                        />
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
                        <Form.Check
                            name={label} type="checkbox" id={label} label={label} key={label}
                            onClick={(e) => itemChecked(props.checkedVehicleIds, props.filterSpecs.vehicle_id, props.setCheckedVehicleIds)}
                            defaultChecked={props.checkedVehicleIds.includes(label)}
                        />
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
                        <Form.Check
                            name={label} type="checkbox" id={label} label={label} key={label}
                            onClick={(e) => itemChecked(props.checkedDriveTraces, props.filterSpecs.drive_trace, props.setCheckedDriveTraces)}
                            defaultChecked={props.checkedDriveTraces.includes(label)}
                        />
                    )}
                </Accordion.Body>
            </Accordion.Item>
        );
    }

    function EngineerItem() {
        return (
            <Accordion.Item eventKey="5">
                <Accordion.Header><h5 style={{margin: "0"}}>Engineer</h5></Accordion.Header>
                <Accordion.Body>
                    {props.filterSpecs.engineer && props.filterSpecs.engineer.map((label)=>
                        <Form.Check
                            name={label} type="checkbox" id={label} label={label} key={label}
                            onClick={(e) => itemChecked(props.checkedEngineers, props.filterSpecs.engineer, props.setCheckedEngineers)}
                            defaultChecked={props.checkedEngineers.includes(label)} 
                        />
                    )}
                </Accordion.Body>
            </Accordion.Item>
        );
    }

    function DriverItem() {
        return (
            <Accordion.Item eventKey="6">
                <Accordion.Header><h5 style={{margin: "0"}}>Driver</h5></Accordion.Header>
                <Accordion.Body>
                    {props.filterSpecs.driver && props.filterSpecs.driver.map((label)=>
                        <Form.Check
                            name={label} type="checkbox" id={label} label={label} key={label}
                            onClick={(e) => itemChecked(props.checkedDrivers, props.filterSpecs.driver, props.setCheckedDrivers)}
                            defaultChecked={props.checkedDrivers.includes(label)}
                        />
                    )}
                </Accordion.Body>
            </Accordion.Item>
        );
    }

    function IwrItem() {
        return (
            <Accordion.Item eventKey="7">
                <Accordion.Header><h5 style={{margin: "0"}}>IWR Range</h5></Accordion.Header>
                <Accordion.Body>
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
                    <div className={props.selectedIwrRange.enableSecondCond ? "show-element" : "hide-element"}>
                        <div className="and-or-container">
                            <Form.Check
                                label="AND"
                                type="radio"
                                name="possibilityRadio"
                                value="and"
                                defaultChecked={props.selectedIwrRange.possibility === "and"}
                                onClick={(e) => iwrRangeChanged("possibility", e.target.value)}
                            />
                            <Form.Check
                                label="OR"
                                type="radio"
                                name="possibilityRadio"
                                value="or"
                                defaultChecked={props.selectedIwrRange.possibility === "or"}
                                onClick={(e) => iwrRangeChanged("possibility", e.target.value)}
                            />
                        </div>
                        <Form.Select style={{margin: "0.25rem 0"}} onChange={(e) => iwrRangeChanged("secondIneq", e.target.value)} defaultValue={props.selectedIwrRange.secondIneq}>
                            <option value="lt">Less Than</option>
                            <option value="lte">Less Than Or Equal To</option>
                            <option value="gt">Greater Than</option>
                            <option value="gte">Greater Than Or Equal To</option>
                        </Form.Select>
                        <Form.Control
                            type="number"
                            placeholder="Enter value"
                            defaultValue={props.selectedIwrRange.secondIneqValue}
                            onBlur={(e) => iwrRangeChanged("secondIneqValue", e.target.value)}
                        />
                    </div>
                    <Form.Switch
                        label={props.selectedIwrRange.enableSecondCond ? "Disable Second Condition" : "Enable Second Condition"}
                        defaultChecked={props.selectedIwrRange.enableSecondCond}
                        onChange={(e) => iwrRangeChanged("enableSecondCond", !props.selectedIwrRange.enableSecondCond)}
                    />
                </Accordion.Body>
            </Accordion.Item>
        );
    }

    function RmsseItem() {
        return (
            <Accordion.Item eventKey="8">
                <Accordion.Header><h5 style={{margin: "0"}}>RMSSE Range</h5></Accordion.Header>
                <Accordion.Body>
                    <Form.Select onChange={(e) => rmsseRangeChanged("firstIneq", e.target.value)} defaultValue={props.selectedRmsseRange.firstIneq}>
                        <option value="lt">Less Than</option>
                        <option value="lte">Less Than Or Equal To</option>
                        <option value="gt">Greater Than</option>
                        <option value="gte">Greater Than Or Equal To</option>
                    </Form.Select>
                    <Form.Control
                        type="number"
                        placeholder="Enter value"
                        style={{margin: "0.25rem 0"}}
                        defaultValue={props.selectedRmsseRange.firstIneqValue}
                        onBlur={(e) => rmsseRangeChanged("firstIneqValue", e.target.value)}
                    />
                    <div className={props.selectedRmsseRange.enableSecondCond ? "show-element" : "hide-element"}>
                        <div className="and-or-container">
                            <Form.Check
                                label="AND"
                                type="radio"
                                name="possibilityRadio"
                                value="and"
                                defaultChecked={props.selectedRmsseRange.possibility === "and"}
                                onClick={(e) => rmsseRangeChanged("possibility", e.target.value)}
                            />
                            <Form.Check
                                label="OR"
                                type="radio"
                                name="possibilityRadio"
                                value="or"
                                defaultChecked={props.selectedRmsseRange.possibility === "or"}
                                onClick={(e) => rmsseRangeChanged("possibility", e.target.value)}
                            />
                        </div>
                        <Form.Select style={{margin: "0.25rem 0"}} onChange={(e) => rmsseRangeChanged("secondIneq", e.target.value)} defaultValue={props.selectedRmsseRange.secondIneq}>
                            <option value="lt">Less Than</option>
                            <option value="lte">Less Than Or Equal To</option>
                            <option value="gt">Greater Than</option>
                            <option value="gte">Greater Than Or Equal To</option>
                        </Form.Select>
                        <Form.Control
                            type="number"
                            placeholder="Enter value"
                            defaultValue={props.selectedRmsseRange.secondIneqValue}
                            onBlur={(e) => rmsseRangeChanged("secondIneqValue", e.target.value)}
                        />
                    </div>
                    <Form.Switch
                        label={props.selectedRmsseRange.enableSecondCond ? "Disable Second Condition" : "Enable Second Condition"}
                        defaultChecked={props.selectedRmsseRange.enableSecondCond}
                        onChange={(e) => rmsseRangeChanged("enableSecondCond", !props.selectedRmsseRange.enableSecondCond)}
                    />
                </Accordion.Body>
            </Accordion.Item>
        );
    }

    return (
        <div className="sidebar-container">
            <h2 style={{margin: "0 auto 0 auto"}}>Filter</h2>
            <div style={{overflowY: "scroll"}}>
                <Accordion style={{padding: "0 0 0.5rem 0"}}>
                    <ColumnItem/>
                    <DatetimeItem/>
                    <CellItem/>
                    <VehicleIdItem/>
                    <DriveTraceItem/>
                    <EngineerItem/>
                    <DriverItem/>
                    <IwrItem/>
                    <RmsseItem/>
                </Accordion>
                <Button variant={props.removeDuplicates ? "success" : "danger"} onClick={() => props.setRemoveDuplicates(!props.removeDuplicates)}>{props.removeDuplicates ? "Bring Back Duplicates" : "Remove Duplicates"}</Button>
            </div>
        </div>
    );
}

export default Sidebar;