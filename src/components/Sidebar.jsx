import React from "react";
import './Sidebar.css';
import Accordion from "react-bootstrap/Accordion";
import Form from 'react-bootstrap/Form';

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

    return (
        <div className="sidebar-container">
            <h2 style={{margin: "0 auto 0 auto", padding: "0 0 0.5rem 0"}}>Filter</h2>
            <Accordion>
                <Accordion.Item eventKey="0">
                    <Accordion.Header><h5 style={{margin: "0"}}>Column</h5></Accordion.Header>
                    <Accordion.Body>
                        <Form>
                            {props.filterSpecs.column && props.filterSpecs.column.map((label)=>
                                <Form.Check name={label} onClick={(e) => columnChecked(e.target.checked, label)} defaultChecked={props.checkedColumns.includes(label)} type="checkbox" id={label} label={label}/>
                            )}
                        </Form>
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="1">
                    <Accordion.Header><h5 style={{margin: "0"}}>Cell</h5></Accordion.Header>
                    <Accordion.Body>
                        <Form>
                            {props.filterSpecs.cell && props.filterSpecs.cell.map((label)=>
                                <Form.Check name={label} onClick={(e) => cellChecked(e.target.checked, label)} defaultChecked={props.checkedCells.includes(label)} type="checkbox" id={label} label={label}/>
                            )}
                        </Form>
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
        </div>
    );
}

export default Sidebar;