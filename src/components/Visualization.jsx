import './Visualization.css';
import Table from 'react-bootstrap/Table';

function Visualization(props) {
    const removeDuplicates = false;
    
    return (
        <div className="vis-container">
            <div className="table-container table-responsive">
                <Table striped bordered hover className="testing">
                    <thead>
                        <tr>
                            {
                                props.records[0] &&
                                Object.keys(props.records[0]).filter((entry) => {
                                    if (!props.checkedColumns.includes(entry)) {
                                        return false;
                                    }
                                    return true;
                                }).map((entry) => <th>{entry}</th>)
                            }
                        </tr>
                    </thead>
                    <tbody>
                        {
                            removeDuplicates ? 
                                Array.from(new Set(props.records.filter((entry) => {
                                    if (props.checkedCells.includes(entry['Cell'])) {
                                        return true;
                                    }
                                    return false;
                                }).map((entry) => {
                                    var temp = [];
                                    Object.entries(entry).forEach((pair) => {
                                        if (props.checkedColumns.includes(pair[0])) {
                                            temp.push(pair[1]);
                                        }
                                    });
                                    return temp;
                                }).map(JSON.stringify)), JSON.parse).map((entry) => {
                                    return <tr>{entry.map((value) => <td>{value}</td>)}</tr>;
                                }) :
                                props.records.filter((entry) => {
                                    if (props.checkedCells.includes(entry['Cell'])) {
                                        return true;
                                    }
                                    return false;
                                }).map((entry) => {
                                    var temp = [];
                                    Object.entries(entry).forEach((pair) => {
                                        if (props.checkedColumns.includes(pair[0])) {
                                            temp.push(pair[1]);
                                        }
                                    });
                                    return <tr>{temp.map((value) => <td>{value}</td>)}</tr>;
                                })
                        }
                    </tbody>
                </Table>
            </div>
        </div>
    );
}

export default Visualization;