import React from "react";
import './Sidebar.css';
import Accordion from "react-bootstrap/Accordion";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import RestartAltIcon from '@mui/icons-material/RestartAlt';

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

    function resetRange(filterSpec, setSelectedRange) {
        let temp = JSON.parse(JSON.stringify(filterSpec));
        temp.firstIneqValue = parseFloat(temp.firstIneqValue);
        temp.secondIneqValue = parseFloat(temp.secondIneqValue);
        setSelectedRange(temp)
    }

    function CheckboxListItem(props) {
        return (
            <Accordion.Item eventKey={props.eventKey}>
                <Accordion.Header><h5 className="accordion-header">{props.header}</h5></Accordion.Header>
                <Accordion.Body>
                    {props.filterSpec && props.filterSpec.map((label)=>
                        <Form.Check
                            name={label} type="checkbox" id={label} label={label} key={label}
                            onClick={(e) => itemChecked(props.checkedBoxes, props.filterSpec, props.setCheckedBoxes)}
                            defaultChecked={props.checkedBoxes.includes(label)}
                        />
                    )}
                    <Button className="reset-button" onClick={(e) => props.setCheckedBoxes(props.filterSpec)}>
                        <RestartAltIcon/>
                        <p style={{margin: "0"}} >Reset</p>
                    </Button>
                </Accordion.Body>
            </Accordion.Item>
        );
    }

    function DatetimeItem() {
        return (
            <Accordion.Item eventKey="1">
                <Accordion.Header><h5 className="accordion-header">Datetime Range</h5></Accordion.Header>
                <Accordion.Body>
                    <p style={{margin: "0", padding: "0 0 0.25rem 0"}}>Start</p>
                    <input
                        type="datetime-local"
                        style={{width: "100%"}}
                        defaultValue={props.selectedDateRange.startDate}
                        onChange={(e) => props.setSelectedDateRange({startDate: e.target.value, endDate: props.selectedDateRange.endDate})}
                    />
                    <p style={{margin: "0", padding: "0.5rem 0 0.25rem 0"}}>End</p>
                    <input
                        type="datetime-local"
                        style={{width: "100%", marginBottom: "0.25rem"}}
                        defaultValue={props.selectedDateRange.endDate}
                        onChange={(e) => props.setSelectedDateRange({startDate: props.selectedDateRange.startDate, endDate: e.target.value})}
                    />
                    <Button className="reset-button" onClick={(e) => props.setSelectedDateRange(props.filterSpecs.reset_date)}>
                        <RestartAltIcon/>
                        <p style={{margin: "0"}} >Reset</p>
                    </Button>
                </Accordion.Body>
            </Accordion.Item>
        );
    }

    function RangeItem(props) {

        function FirstCondition() {
            return (
                <div>
                    <Form.Select
                        onChange={(e) => rangeChanged("firstIneq", e.target.value, props.selectedRange, props.setSelectedRange)}
                        defaultValue={props.selectedRange.firstIneq}
                    >
                        <option value="lt">Less Than</option>
                        <option value="lte">Less Than Or Equal To</option>
                        <option value="gt">Greater Than</option>
                        <option value="gte">Greater Than Or Equal To</option>
                    </Form.Select>
                    <Form.Control
                        type="number" placeholder="Enter value" className="range-entry"
                        defaultValue={props.selectedRange.firstIneqValue}
                        onBlur={(e) => rangeChanged("firstIneqValue", e.target.value, props.selectedRange, props.setSelectedRange)}
                    />
                </div>
            );
        }

        function SecondCondition() {
            return (
                <div className={props.selectedRange.enableSecondCond ? "show-element" : "hide-element"}>
                    <div className="and-or-container">
                        <Form.Check
                            label="AND" type="radio" name={"possibilityRadio" +props.header} value="and"
                            defaultChecked={props.selectedRange.possibility === "and"}
                            onClick={(e) => rangeChanged("possibility", e.target.value, props.selectedRange, props.setSelectedRange)}
                        />
                        <Form.Check
                            label="OR" type="radio" name={"possibilityRadio" +props.header} value="or"
                            defaultChecked={props.selectedRange.possibility === "or"}
                            onClick={(e) => rangeChanged("possibility", e.target.value, props.selectedRange, props.setSelectedRange)}
                        />
                    </div>
                    <Form.Select
                        className="range-entry" defaultValue={props.selectedRange.secondIneq}
                        onChange={(e) => rangeChanged("secondIneq", e.target.value, props.selectedRange, props.setSelectedRange)}
                    >
                        <option value="lt">Less Than</option>
                        <option value="lte">Less Than Or Equal To</option>
                        <option value="gt">Greater Than</option>
                        <option value="gte">Greater Than Or Equal To</option>
                    </Form.Select>
                    <Form.Control
                        type="number" placeholder="Enter value" defaultValue={props.selectedRange.secondIneqValue}
                        onBlur={(e) => rangeChanged("secondIneqValue", e.target.value, props.selectedRange, props.setSelectedRange)}
                    />
                </div>
            );
        }

        function EnableSecondConditionSwitch() {
            return (
                <Form.Switch
                    label={props.selectedRange.enableSecondCond ? "Disable Second Condition" : "Enable Second Condition"}
                    defaultChecked={props.selectedRange.enableSecondCond}
                    onChange={(e) => rangeChanged("enableSecondCond", !props.selectedRange.enableSecondCond, props.selectedRange, props.setSelectedRange)}
                />
            );
        }

        return (
            <Accordion.Item eventKey={props.eventKey}>
                <Accordion.Header><h5 className="accordion-header">{props.header}</h5></Accordion.Header>
                <Accordion.Body>
                    <FirstCondition/>
                    <SecondCondition/>
                    <EnableSecondConditionSwitch/>
                    <Button className="reset-button" onClick={(e) => resetRange(props.filterSpec, props.setSelectedRange)}>
                        <RestartAltIcon/>
                        <p style={{margin: "0"}} >Reset</p>
                    </Button>
                </Accordion.Body>
            </Accordion.Item>
        );
    }

    return (
        <div className="sidebar-container">
            <h2 className="sidebar-header">Filter</h2>
            <div style={{overflowY: "scroll"}}>
                <Accordion className="accordion-container">
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
                    <RangeItem
                        eventKey={7} header="IWR Range" filterSpec={props.filterSpecs.reset_iwr}
                        selectedRange={props.selectedIwrRange} setSelectedRange={props.setSelectedIwrRange}
                    />
                    <RangeItem
                        eventKey={8} header="RMSSE Range" filterSpec={props.filterSpecs.reset_rmsse}
                        selectedRange={props.selectedRmsseRange} setSelectedRange={props.setSelectedRmsseRange}
                    />
                    <RangeItem
                        eventKey={9} header="TotalCOgkm Range" filterSpec={props.filterSpecs.reset_co}
                        selectedRange={props.selectedTotalCoRange} setSelectedRange={props.setSelectedTotalCoRange}
                    />
                    <RangeItem
                        eventKey={10} header="TotalCO2gkm Range" filterSpec={props.filterSpecs.reset_co2}
                        selectedRange={props.selectedTotalCo2Range} setSelectedRange={props.setSelectedTotalCo2Range}
                    />
                </Accordion>
                <Form.Switch
                    style={{marginLeft: "0.5rem"}}
                    label={"Remove Duplicates"}
                    defaultChecked={props.removeDuplicates}
                    onClick={() => props.setRemoveDuplicates(!props.removeDuplicates)}
                />
            </div>
        </div>
    );
}

export default Sidebar;