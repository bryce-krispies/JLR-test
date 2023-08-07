import './Visualization.css';
import Table from 'react-bootstrap/Table';

function Visualization(props) {
    function filterRows() {
        function CheckIfEntryMeetsRange(range, value) {
            let passesFirstCond = true;
            switch(range.firstIneq) {
                case "lt":
                    if (!(range.firstIneqValue > value)) passesFirstCond = false;
                    break;
                case "lte":
                    if (!(range.firstIneqValue >= value)) passesFirstCond = false;
                    break;
                case "gt":
                    if (!(range.firstIneqValue < value)) passesFirstCond = false;
                    break;
                case "gte":
                    if (!(range.firstIneqValue <= value)) passesFirstCond = false;
                    break;
                default:
            }
            if (range.enableSecondCond) {
                let passesSecondCond = true;
                switch(range.secondIneq) {
                    case "lt":
                        if (!(range.secondIneqValue > value)) passesSecondCond = false;
                        break;
                    case "lte":
                        if (!(range.secondIneqValue >= value)) passesSecondCond = false;
                        break;
                    case "gt":
                        if (!(range.secondIneqValue < value)) passesSecondCond = false;
                        break;
                    case "gte":
                        if (!(range.secondIneqValue <= value)) passesSecondCond = false;
                        break;
                    default:
                }

                if ((range.possibility === "and") && !(passesFirstCond && passesSecondCond))  return false;
                else if ((range.possibility === "or") && !(passesFirstCond || passesSecondCond))  return false;

            } else if(!passesFirstCond) return false;

            return true;
        }

        return (
            props.records.filter((entry) => {
                //date filtering
                let splitDatetime = entry['TestDateTime'].split("/");
                if (new Date(props.selectedDateRange.startDate) > new Date(splitDatetime[1]+"/"+splitDatetime[0]+"/"+splitDatetime[2])) return false;
                if (new Date(props.selectedDateRange.endDate) < new Date(splitDatetime[1]+"/"+splitDatetime[0]+"/"+splitDatetime[2])) return false;

                //cell filtering
                if (!props.checkedCells.includes(entry['Cell'])) return false;

                //vehicle id filtering
                if (!props.checkedVehicleIds.includes(entry['VehicleID'])) return false;

                //drive trace filtering
                if (!props.checkedDriveTraces.includes(entry['DriveTrace'])) return false;

                //engineer filtering
                if (!props.checkedEngineers.includes(entry['Engineer'])) return false;

                //driver filtering
                if (!props.checkedDrivers.includes(entry['Driver'])) return false;

                //iwr filtering
                if (!CheckIfEntryMeetsRange(props.selectedIwrRange, entry['IWR'])) return false;

                //rmsse filtering
                if (!CheckIfEntryMeetsRange(props.selectedRmsseRange, entry['RMSSE'])) return false;

                //total co filtering
                if (!CheckIfEntryMeetsRange(props.selectedTotalCoRange, entry['TotalCOgkm'])) return false;

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
                <Table striped bordered hover size="sm">
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