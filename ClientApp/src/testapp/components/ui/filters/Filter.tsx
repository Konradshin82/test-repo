import * as React from 'react';
import './Filter.css';

const Filter = (props: any) => {
    return (
        <tr>
            <th><input className="Address" type="search" onChange={(event: any) => { props.changed(event, "Address"); }} id="address" name="address"/></th>
            <th><input type="number" onChange={(event: any) => { props.changed(event, "Balance"); }} name="balance" id="balance" min="0" max="99999999999999999999" step="2"/></th>
            <th><input type="datetime-local" onChange={(event: any) => { props.changed(event, "CreateTime"); }} name="createtime" id="createtime" min="1982-06-07T00:00" max="2040-06-14T00:00"/></th>
            <th><input type="datetime-local" onChange={(event: any) => { props.changed(event, "LatestOperationTime"); }} name="latestoperationtime" id="latestoperationtime" min="1982-06-07T00:00" max="2040-06-14T00:00" /></th>
            <th className="text-center">{"Filter"}</th>
            <th><button onClick={() => { props.clickGetAccounts(); }} className="btn btn-primary">GetAccounts</button></th>
            
        </tr>
    )
};

export default Filter;