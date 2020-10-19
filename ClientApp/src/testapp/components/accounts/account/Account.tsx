import * as React from 'react';
import './Account.css';

const Account = (props) => {
    return(
        <tr key={props.key}>
            <td className="Address">{props.address}</td>
            <td className="Balance">{props.balance}</td>
            <td className="CreateTime">{props.createtime}</td>
            <td className="OperationTime">{props.latestoprationtime}</td>
            <td className="text-center"><button onClick={props.clickCreate} className="btn btn-primary">Add</button></td>
            <td className="text-center"><button onClick={props.clickDelete} className="btn btn-danger">Delete</button></td>
        </tr>
        )
};

export default Account