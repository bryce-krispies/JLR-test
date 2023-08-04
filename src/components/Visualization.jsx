import './Visualization.css';
import Table from 'react-bootstrap/Table';

function Visualization(props) {
    /*
    <Table striped bordered hover variant="dark" className="testing">
                    <thead>
                        <tr>
                            {Object.keys(props.record).map((object) => <th>{object}</th>)}
                        </tr>
                    </thead>
                    <tbody>
                        {props.filtered.map((temp) => <tr>{Object.values(temp).map((innerObj) => <td>{innerObj}</td>)}</tr>)}
                    </tbody>
                </Table>
                */
    return (
        <div className="vis-container">
            <div className="table-container table-responsive">
            <Table striped bordered hover variant="success" className="testing">
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