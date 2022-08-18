import React from 'react';
import './Row.css';

type RowProps = {
    _id: string;
    saying: string;
    author: string;
    topic: string;
    updateSelectedId: (id: string) => void;
    highlightNewRow: (id: string) => void;
};

export function Row(props: RowProps) {
    function updateSelectedId(event: React.MouseEvent) {
        props.highlightNewRow(props._id);
        props.updateSelectedId(props._id);
    }

    return (
        <div
            id={props._id}
            className="row align-items-center justify-content-center myrowintable selectable-row"
            onClick={(event: React.MouseEvent) => updateSelectedId(event)}
        >
            <div className="col-md-6">{props.saying}</div>
            <div className="col-3">{props.author}</div>
            <div className="col-3">{props.topic}</div>
        </div>
    );
}

export default Row;
