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

    function highlightNewRow (id: string) {
        const list = document.getElementsByClassName("selectable-row");
        Array.prototype.forEach.call(list, element => element.classList.remove('bg-secondary'));
        document.getElementById(id)?.classList.add('bg-secondary');
    }

    return (
        <div className="container-fluid my-5" >
            <div className="border border-1 border-dark mytable">
                <div>
                    <div className="row align-items-center justify-content-center myrowintable">
                        <div className="col-md-6">Saying</div>
                        <div className="col-3">Author</div>
                        <div className="col-3">Topic</div>
                    </div>
                </div>
                <div>
                    { props.arrayOfRowObjects.map( rowObject =>
                        <Row
                            key = {rowObject._id} 
                            {...rowObject}
                            updateSelectedId = { (id: string) => props.updateSelectedId(id) }
                            highlightNewRow = { (id: string) => highlightNewRow(id) }
                        />
                    ) }             
                </div>
            </div>
        </div>
    );
}

export default Table;