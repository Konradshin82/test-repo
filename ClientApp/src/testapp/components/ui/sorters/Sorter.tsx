import * as React from 'react';

const Sorter = (props: any) => {
    return (
        <tr>
            <th className="text-center"><button className="btn btn-link" onClick={() => { props.click(props.address); }}>{props.address}</button></th>
            <th className="text-center"><button className="btn btn-link" onClick={() => { props.click(props.balance); }}>{props.balance}</button></th>
            <th className="text-center"><button className="btn btn-link" onClick={() => { props.click(props.createtime); }}>{props.createtime}</button></th>
            <th className="text-center"><button className="btn btn-link" onClick={() => { props.click(props.latestoperationtime); }}>{props.latestoperationtime}</button></th>
            <th className="text-center">{"Sorter"}</th>
            <th className="text-center">{"Action"}</th>
        </tr>
    )
};

export default Sorter;