import './Visualization.css';
import Table from 'react-bootstrap/Table';

function Visualization(props) {
    function filterRows() {
        return (
            props.records.filter((entry) => {
                if (props.checkedCells.includes(entry['Cell'])) {
                    return true;
                }
                return false;
            })
        );
    }

    function filterColumns(data) {
        return (
            data.map((entry) => {
                var temp = [];
                Object.entries(entry).forEach((pair) => {
                    if (props.checkedColumns.includes(pair[0])) {
                        temp.push(pair[1]);
                    }
                });
                return temp;
            })
        );
    }

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
                            (
                                props.removeDuplicates ? 
                                    Array.from(new Set(filterColumns(filterRows()).map(JSON.stringify)), JSON.parse) :
                                    filterColumns(filterRows())
                            ).map((entry) => <tr>{entry.map((value) => <td>{value}</td>)}</tr>)
                        }
                    </tbody>
                </Table>
            </div>
        </div>
    );
}

export default Visualization;