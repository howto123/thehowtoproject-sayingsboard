import './Row.css';

type RowProps = {
    _id: string;
    saying: string;
    author: string;
    topic: string;
    selectedId: string;
    setSelectedId: (id: string) => void;
    changeHandler: (field: string, newValue: string, id: string) => void;
};

export function Row(props: RowProps) {
    const staticStyles =
        'row align-items-flex justify-content-center row-in-table selectable-row border-0 ';

    function reaciveStyles() {
        return staticStyles.concat(props._id === props.selectedId ? 'bg-secondary' : '');
    }

    return (
        <div
            id={props._id}
            className={reaciveStyles()}
            onClick={() => props.setSelectedId(props._id)}
        >
            <div className="col-sm-12 col-md-6 d-flex overflow-hidden">
                <div className="d-md-none table-label-small border-0 p-0">Saying: </div>
                <input
                    type="text"
                    value={props.saying}
                    onChange={(e) =>
                        props.changeHandler('saying', String(e.target.value), props._id)
                    }
                    className="border-0 p-0 text-center w-100"
                />
            </div>
            <div className="col-sm-12 col-md-3 d-flex overflow-hidden">
                <div className="d-md-none table-label-small border-0 p-0">Author: </div>
                <input
                    type="text"
                    value={props.author}
                    onChange={(e) =>
                        props.changeHandler('author', String(e.target.value), props._id)
                    }
                    className="border-0 p-0 text-center w-100"
                />
            </div>
            <div className="col-sm-12 col-md-3 d-flex overflow-hidden">
                <div className="d-md-none table-label-small border-0 p-0">Topic: </div>
                <input
                    type="text"
                    value={props.topic}
                    onChange={(e) =>
                        props.changeHandler('topic', String(e.target.value), props._id)
                    }
                    className="border-0 p-0 text-center w-100"
                />
            </div>
            <div className="d-md-none bg-white p-2 border-start-0 border-end-0"></div>
        </div>
    );
}

export default Row;
