import React from 'react';
import './Row.css';

type RowProps = {
    _id: string;
    saying: string;
    author: string;
    topic: string;
    selectedId: string;
    setSelectedId: (id: string) => void;
};

export function Row(props: RowProps) {
    function updateSelectedId(event: React.MouseEvent) {
        props.setSelectedId(props._id);
    }

    const staticStyles =
        'row align-items-center justify-content-center row-in-table selectable-row border-0 ';

    function reaciveStyles() {
        return staticStyles.concat(props._id === props.selectedId ? 'bg-secondary' : '');
    }

    return (
        <div
            id={props._id}
            className={reaciveStyles()}
            onClick={(event: React.MouseEvent) => props.setSelectedId(props._id)}
        >
            <div className="col-sm-12 col-md-6">
                <div className="d-md-none table-label-small border-0 p-0">Saying: </div>
                {props.saying}
            </div>
            <div className="col-sm-12 col-md-3">
                <div className="d-md-none table-label-small border-0 p-0">Author: </div>
                {props.author}
            </div>
            <div className="col-sm-12 col-md-3">
                <div className="d-md-none table-label-small border-0 p-0">Topic: </div>
                {props.topic}
            </div>
            <div className="d-md-none bg-dark p-0">Author: </div>
        </div>
    );
}

export default Row;
