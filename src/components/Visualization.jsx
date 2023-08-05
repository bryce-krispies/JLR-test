import './Visualization.css';
import Table from 'react-bootstrap/Table';

function Visualization(props) {
    return (
        <div className="vis-container">
            <div className="table-container table-responsive">
                <Table striped bordered hover className="testing">
                    <thead>
                        <tr>
                            {props.records[0] && Object.keys(props.records[0]).filter((entry) => {/*TODO*/return true;}).map((entry) => <th>{entry}</th>)}
                        </tr>
                    </thead>
                    <tbody>
                        {
                            props.records.filter((entry) => {
                                if (props.checkedCells.includes(entry['Cell'])) {
                                    return true;
                                }
                                return false;
                            }).map((entry) => <tr>{Object.values(entry).map((value) => <td>{value}</td>)}</tr>)
                        }
                    </tbody>
                </Table>
            </div>
        </div>
    );
}

export default Visualization;