import React from 'react';
import './Row.css';

type RowProps = {
    _id: string;
    saying: string
    author: string
    topic: string
    updateSelectedId: (id: string) => void;
}

export function Row(props: RowProps) {

    function updateSelectedId(event: React.MouseEvent) {
        props.updateSelectedId(props._id);
    }

    return (
        <tr onClick = { (event: React.MouseEvent) => updateSelectedId(event) }>
            <td className="">
                {props.saying}
            </td>
            <td className="">
                {props.author}
            </td>
            <td className="">
                {props.topic}
            </td>
        </tr>
    );
}

export default Row;