import { Row } from './Row';
import { SayingModel } from '../data/dataModel'


type TableProps = {
    arrayOfRowObjects: SayingModel[];
    updateSelectedId: (id: string) => void;
}

/**
 * creates an array containing the rows we want as jsx
 * 
 */
function Table(props: TableProps) {

    return (
        <table className="table table-bordered border-dark" >
            <thead>
                <tr>
                    <th scope="col" className="col-md-6">Saying</th>
                    <th scope="col" className="col-md-2">Author</th>
                    <th scope="col" className="col-md-2">Topic</th>
                </tr>
            </thead>
            <tbody>
                { props.arrayOfRowObjects.map( rowObject =>
                    <Row
                        key = {rowObject._id} 
                        {...rowObject}
                        updateSelectedId = { (id: string) => props.updateSelectedId(id) }
                    />
                ) }             
            </tbody>
        </table>
    );
}

export default Table;