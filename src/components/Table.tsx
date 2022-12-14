import { Row } from './Row';
import { SayingModel } from '../data/dataModel';

type TableProps = {
    loading: boolean;
    arrayOfRowObjects: SayingModel[];
    selectedId: string;
    setSelectedId: (id: string) => void;
    changeHandler: (field: string, newValue: string, id: string) => void;
};

/**
 * creates an array containing the rows we want as jsx
 *
 */
function Table(props: TableProps) {
    const Loading = () => {
        if (props.loading) {
            return <div>Loading...</div>;
        } else {
            return <></>;
        }
    };
    return (
        <div className="container-fluid my-5">
            <div className="border border-1 border-dark mytable">
                <div>
                    <div className="row responsive-table-head align-items-center justify-content-center row-in-table">
                        <div className="d-none d-md-block col-md-6 fw-bold">Saying</div>
                        <div className="d-none d-md-block col-md-3 fw-bold">Author</div>
                        <div className="d-none d-md-block col-md-3 fw-bold">Topic</div>
                    </div>
                </div>
                <div>
                    <Loading />
                    {props.arrayOfRowObjects.map((rowObject) => (
                        <Row
                            key={rowObject._id}
                            {...rowObject}
                            selectedId={props.selectedId}
                            setSelectedId={props.setSelectedId}
                            changeHandler={props.changeHandler}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Table;
