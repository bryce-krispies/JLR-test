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
                temp.firstIneqValue = value;
                break;
            case "possibility":
                temp.possibility = value;
                break;
            case "secondIneq":
                temp.secondIneq = value;
                break;
            case "secondIneqValue":
                temp.secondIneqValue = value;
                break;
            default:
        }
        props.setSelectedIwrRange(JSON.parse(JSON.stringify(temp)))
    }

    function IWRItem() {
        return (
            <Accordion.Item eventKey="2">
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
                        onChange={(e) => iwrRangeChanged("firstIneqValue", e.target.value)}
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
                <Accordion.Item eventKey="0">
                    <Accordion.Header><h5 style={{margin: "0"}}>Column</h5></Accordion.Header>
                    <Accordion.Body>
                        {props.filterSpecs.column && props.filterSpecs.column.map((label)=>
                            <Form.Check name={label} onClick={(e) => columnChecked(e.target.checked, label)} defaultChecked={props.checkedColumns.includes(label)} type="checkbox" id={label} label={label}/>
                        )}
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="1">
                    <Accordion.Header><h5 style={{margin: "0"}}>Cell</h5></Accordion.Header>
                    <Accordion.Body>
                        {props.filterSpecs.cell && props.filterSpecs.cell.map((label)=>
                            <Form.Check name={label} onClick={(e) => cellChecked(e.target.checked, label)} defaultChecked={props.checkedCells.includes(label)} type="checkbox" id={label} label={label}/>
                        )}
                    </Accordion.Body>
                </Accordion.Item>
                <IWRItem/>
            </Accordion>
            <Button variant={props.removeDuplicates ? "success" : "danger"} onClick={() => props.setRemoveDuplicates(!props.removeDuplicates)}>{props.removeDuplicates ? "Bring Back Duplicates" : "Remove Duplicates"}</Button>
        </div>
    );
}

export default Sidebar;