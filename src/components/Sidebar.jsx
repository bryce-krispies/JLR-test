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

    function rangeChanged(type, value, selectedRange, setSelectedRange) {
        let temp = selectedRange;
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
        setSelectedRange(JSON.parse(JSON.stringify(temp)))
    }

    function CheckboxListItem(props) {
        return (
            <Accordion.Item eventKey={props.eventKey}>
                <Accordion.Header><h5 style={{margin: "0"}}>{props.header}</h5></Accordion.Header>
                <Accordion.Body>
                    {props.filterSpec && props.filterSpec.map((label)=>
                        <Form.Check
                            name={label} type="checkbox" id={label} label={label} key={label}
                            onClick={(e) => itemChecked(props.checkedBoxes, props.filterSpec, props.setCheckedBoxes)}
                            defaultChecked={props.checkedBoxes.includes(label)}
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

    function IwrItem() {
        return (
            <Accordion.Item eventKey="7">
                <Accordion.Header><h5 style={{margin: "0"}}>IWR Range</h5></Accordion.Header>
                <Accordion.Body>
                    <Form.Select onChange={(e) => rangeChanged("firstIneq", e.target.value, props.selectedIwrRange, props.setSelectedIwrRange)} defaultValue={props.selectedIwrRange.firstIneq}>
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
                        onBlur={(e) => rangeChanged("firstIneqValue", e.target.value, props.selectedIwrRange, props.setSelectedIwrRange)}
                    />
                    <div className={props.selectedIwrRange.enableSecondCond ? "show-element" : "hide-element"}>
                        <div className="and-or-container">
                            <Form.Check
                                label="AND"
                                type="radio"
                                name="possibilityRadio"
                                value="and"
                                defaultChecked={props.selectedIwrRange.possibility === "and"}
                                onClick={(e) => rangeChanged("possibility", e.target.value, props.selectedIwrRange, props.setSelectedIwrRange)}
                            />
                            <Form.Check
                                label="OR"
                                type="radio"
                                name="possibilityRadio"
                                value="or"
                                defaultChecked={props.selectedIwrRange.possibility === "or"}
                                onClick={(e) => rangeChanged("possibility", e.target.value, props.selectedIwrRange, props.setSelectedIwrRange)}
                            />
                        </div>
                        <Form.Select style={{margin: "0.25rem 0"}} onChange={(e) => rangeChanged("secondIneq", e.target.value, props.selectedIwrRange, props.setSelectedIwrRange)} defaultValue={props.selectedIwrRange.secondIneq}>
                            <option value="lt">Less Than</option>
                            <option value="lte">Less Than Or Equal To</option>
                            <option value="gt">Greater Than</option>
                            <option value="gte">Greater Than Or Equal To</option>
                        </Form.Select>
                        <Form.Control
                            type="number"
                            placeholder="Enter value"
                            defaultValue={props.selectedIwrRange.secondIneqValue}
                            onBlur={(e) => rangeChanged("secondIneqValue", e.target.value, props.selectedIwrRange, props.setSelectedIwrRange)}
                        />
                    </div>
                    <Form.Switch
                        label={props.selectedIwrRange.enableSecondCond ? "Disable Second Condition" : "Enable Second Condition"}
                        defaultChecked={props.selectedIwrRange.enableSecondCond}
                        onChange={(e) => rangeChanged("enableSecondCond", !props.selectedIwrRange.enableSecondCond, props.selectedIwrRange, props.setSelectedIwrRange)}
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
                    <Form.Select onChange={(e) => rangeChanged("firstIneq", e.target.value, props.selectedRmsseRange, props.setSelectedRmsseRange)} defaultValue={props.selectedRmsseRange.firstIneq}>
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
                        onBlur={(e) => rangeChanged("firstIneqValue", e.target.value, props.selectedRmsseRange, props.setSelectedRmsseRange)}
                    />
                    <div className={props.selectedRmsseRange.enableSecondCond ? "show-element" : "hide-element"}>
                        <div className="and-or-container">
                            <Form.Check
                                label="AND"
                                type="radio"
                                name="possibilityRadio"
                                value="and"
                                defaultChecked={props.selectedRmsseRange.possibility === "and"}
                                onClick={(e) => rangeChanged("possibility", e.target.value, props.selectedRmsseRange, props.setSelectedRmsseRange)}
                            />
                            <Form.Check
                                label="OR"
                                type="radio"
                                name="possibilityRadio"
                                value="or"
                                defaultChecked={props.selectedRmsseRange.possibility === "or"}
                                onClick={(e) => rangeChanged("possibility", e.target.value, props.selectedRmsseRange, props.setSelectedRmsseRange)}
                            />
                        </div>
                        <Form.Select style={{margin: "0.25rem 0"}} onChange={(e) => rangeChanged("secondIneq", e.target.value, props.selectedRmsseRange, props.setSelectedRmsseRange)} defaultValue={props.selectedRmsseRange.secondIneq}>
                            <option value="lt">Less Than</option>
                            <option value="lte">Less Than Or Equal To</option>
                            <option value="gt">Greater Than</option>
                            <option value="gte">Greater Than Or Equal To</option>
                        </Form.Select>
                        <Form.Control
                            type="number"
                            placeholder="Enter value"
                            defaultValue={props.selectedRmsseRange.secondIneqValue}
                            onBlur={(e) => rangeChanged("secondIneqValue", e.target.value, props.selectedRmsseRange, props.setSelectedRmsseRange)}
                        />
                    </div>
                    <Form.Switch
                        label={props.selectedRmsseRange.enableSecondCond ? "Disable Second Condition" : "Enable Second Condition"}
                        defaultChecked={props.selectedRmsseRange.enableSecondCond}
                        onChange={(e) => rangeChanged("enableSecondCond", !props.selectedRmsseRange.enableSecondCond, props.selectedRmsseRange, props.setSelectedRmsseRange)}
                    />
                </Accordion.Body>
            </Accordion.Item>
        );
    }

    function TotalCoItem() {
        return (
            <Accordion.Item eventKey="9">
                <Accordion.Header><h5 style={{margin: "0"}}>TotalCOgkm Range</h5></Accordion.Header>
                <Accordion.Body>
                    <Form.Select
                        onChange={(e) => rangeChanged("firstIneq", e.target.value, props.selectedTotalCoRange, props.setSelectedTotalCoRange)}
                        defaultValue={props.selectedTotalCoRange.firstIneq}
                    >
                        <option value="lt">Less Than</option>
                        <option value="lte">Less Than Or Equal To</option>
                        <option value="gt">Greater Than</option>
                        <option value="gte">Greater Than Or Equal To</option>
                    </Form.Select>
                    <Form.Control
                        type="number" placeholder="Enter value" style={{margin: "0.25rem 0"}}
                        defaultValue={props.selectedTotalCoRange.firstIneqValue}
                        onBlur={(e) => rangeChanged("firstIneqValue", e.target.value, props.selectedTotalCoRange, props.setSelectedTotalCoRange)}
                    />
                    <div className={props.selectedTotalCoRange.enableSecondCond ? "show-element" : "hide-element"}>
                        <div className="and-or-container">
                            <Form.Check
                                label="AND" type="radio" name="possibilityRadio" value="and"
                                defaultChecked={props.selectedTotalCoRange.possibility === "and"}
                                onClick={(e) => rangeChanged("possibility", e.target.value, props.selectedTotalCoRange, props.setSelectedTotalCoRange)}
                            />
                            <Form.Check
                                label="OR" type="radio" name="possibilityRadio" value="or"
                                defaultChecked={props.selectedTotalCoRange.possibility === "or"}
                                onClick={(e) => rangeChanged("possibility", e.target.value, props.selectedTotalCoRange, props.setSelectedTotalCoRange)}
                            />
                        </div>
                        <Form.Select
                            style={{margin: "0.25rem 0"}}
                            onChange={(e) => rangeChanged("secondIneq", e.target.value, props.selectedTotalCoRange, props.setSelectedTotalCoRange)}
                            defaultValue={props.selectedTotalCoRange.secondIneq}
                        >
                            <option value="lt">Less Than</option>
                            <option value="lte">Less Than Or Equal To</option>
                            <option value="gt">Greater Than</option>
                            <option value="gte">Greater Than Or Equal To</option>
                        </Form.Select>
                        <Form.Control
                            type="number" placeholder="Enter value" defaultValue={props.selectedTotalCoRange.secondIneqValue}
                            onBlur={(e) => rangeChanged("secondIneqValue", e.target.value, props.selectedTotalCoRange, props.setSelectedTotalCoRange)}
                        />
                    </div>
                    <Form.Switch
                        label={props.selectedTotalCoRange.enableSecondCond ? "Disable Second Condition" : "Enable Second Condition"}
                        defaultChecked={props.selectedTotalCoRange.enableSecondCond}
                        onChange={(e) => rangeChanged("enableSecondCond", !props.selectedTotalCoRange.enableSecondCond, props.selectedTotalCoRange, props.setSelectedTotalCoRange)}
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
                    <CheckboxListItem
                        eventKey={0} header="Column" filterSpec={props.filterSpecs.column}
                        checkedBoxes={props.checkedColumns} setCheckedBoxes={props.setCheckedColumns}
                    />
                    <DatetimeItem/>
                    <CheckboxListItem
                        eventKey={2} header="Cell" filterSpec={props.filterSpecs.cell}
                        checkedBoxes={props.checkedCells} setCheckedBoxes={props.setCheckedCells}
                    />
                    <CheckboxListItem
                        eventKey={3} header="Vehicle ID" filterSpec={props.filterSpecs.vehicle_id}
                        checkedBoxes={props.checkedVehicleIds} setCheckedBoxes={props.setCheckedVehicleIds}
                    />
                    <CheckboxListItem
                        eventKey={4} header="Drive Trace" filterSpec={props.filterSpecs.drive_trace}
                        checkedBoxes={props.checkedDriveTraces} setCheckedBoxes={props.setCheckedDriveTraces}
                    />
                    <CheckboxListItem
                        eventKey={5} header="Engineer" filterSpec={props.filterSpecs.engineer}
                        checkedBoxes={props.checkedEngineers} setCheckedBoxes={props.setCheckedEngineers}
                    />
                    <CheckboxListItem
                        eventKey={6} header="Driver" filterSpec={props.filterSpecs.driver}
                        checkedBoxes={props.checkedDrivers} setCheckedBoxes={props.setCheckedDrivers}
                    />
                    <IwrItem/>
                    <RmsseItem/>
                    <TotalCoItem/>
                </Accordion>
                <Button variant={props.removeDuplicates ? "success" : "danger"} onClick={() => props.setRemoveDuplicates(!props.removeDuplicates)}>{props.removeDuplicates ? "Bring Back Duplicates" : "Remove Duplicates"}</Button>
            </div>
        </div>
    );
}

export default Sidebar;