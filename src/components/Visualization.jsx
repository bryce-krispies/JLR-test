import './Visualization.css';
import Table from 'react-bootstrap/Table';

function Visualization(props) {
    return (
        <div className="vis-container">
            <div className="table-container table-responsive">
            <Table striped bordered hover className="testing">
                    <thead>
                        <tr>
                            {Object.keys(props.record).map((object) => <th>{object}</th>)}
                        </tr>
                    </thead>
                    <tbody>
                        {props.filtered.map((temp) => <tr>{Object.values(temp).map((innerObj) => <td>{innerObj}</td>)}</tr>)}
                    </tbody>
                </Table>
            </div>
        </div>
    );
}

export default Visualization;