import './Visualization.css';
import Table from 'react-bootstrap/Table';

function Visualization(props) {
    function filterRows() {
        return (
            props.records.filter((entry) => {
                //cell filtering
                if (!props.checkedCells.includes(entry['Cell'])) {
                    return false;
                }

                //iwr filtering
                let passesFirstCond = true;
                switch(props.selectedIwrRange.firstIneq) {
                    case "lt":
                        if (!(props.selectedIwrRange.firstIneqValue > entry['IWR'])) passesFirstCond = false;
                        break;
                    case "lte":
                        if (!(props.selectedIwrRange.firstIneqValue >= entry['IWR'])) passesFirstCond = false;
                        break;
                    case "gt":
                        if (!(props.selectedIwrRange.firstIneqValue < entry['IWR'])) passesFirstCond = false;
                        break;
                    case "gte":
                        if (!(props.selectedIwrRange.firstIneqValue <= entry['IWR'])) passesFirstCond = false;
                        break;
                    default:
                }

                if (props.selectedIwrRange.enableSecondCond) {
                    let passesSecondCond = true;
                    switch(props.selectedIwrRange.secondIneq) {
                        case "lt":
                            if (!(props.selectedIwrRange.secondIneqValue > entry['IWR']))
                                passesSecondCond = false;
                            break;
                        case "lte":
                            if (!(props.selectedIwrRange.secondIneqValue >= entry['IWR']))
                                passesSecondCond = false;
                            break;
                        case "gt":
                            if (!(props.selectedIwrRange.secondIneqValue < entry['IWR']))
                                passesSecondCond = false;
                            break;
                        case "gte":
                            if (!(props.selectedIwrRange.secondIneqValue <= entry['IWR']))
                                passesSecondCond = false;
                            break;
                        default:
                    }

                    if ((props.selectedIwrRange.possibility === "and") && !(passesFirstCond && passesSecondCond)) {
                        return false;
                    } else if ((props.selectedIwrRange.possibility === "or") && !(passesFirstCond || passesSecondCond)) {
                        return false;
                    }
                } else {
                    if(!passesFirstCond) return false;
                }

                return true;
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