import React from 'react';
import react from 'react';


export type FormContent = {
    saying: string;
    author: string;
    topic: string;
}

export type FormState = {
    dbAction: 'create'|'delete'|'update';
    content: FormContent;
}

type FormProps = {
    handleFormSubmit: (stateWhenSubmit: FormState) => void;
    selectedId: string;
}

/**
 * This form allows the user to make crud operations on the table shown via the table component.
 * (the selectedId is not in the form but important for backend requests. It sits on the app
 * component and being updated via the table component)
 */
class Form extends react.Component<FormProps, FormState> {
    constructor(props: FormProps) {
        super(props);
        this.state = {
            dbAction: 'create',
            content: {
                // _id is passed as prop from App.js
                saying: '',
                author: '',
                topic: ''
            }
        };
    }

    state: FormState;

    handleFormSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        const input = new FormData(event.target as HTMLFormElement);

        // read values
        const stateWhenSubmit: FormState = {
            dbAction: input.get('action') as 'create'|'delete'|'update',
            content: {
                saying: input.get('saying') as string,
                author: input.get('author') as string,
                topic: input.get('topic') as string
            }
        }
        // update form state
        this.setState(stateWhenSubmit);
        //console.log("dev: don't forget to restet the form...A");

        // call the submit handler of the parent
        this.props.handleFormSubmit(stateWhenSubmit);
    };
    
    render() {
        return (
            <form name="form" className="table" onSubmit={this.handleFormSubmit}>
                <select name="action" className="row">
                    <option value='create' className="col" >Add new saying</option>
                    <option value='update' className="col">Modify highlighted saying</option>
                    <option value='delete' className="col">Delete saying</option>
                </select>
                <br/>
                <div className="row">
                    <input name="saying" type="text" placeholder="Saying (mandatory)" className="col-md-6"/>
                    <input name="author" type="text" placeholder="Author" className="col-md-2"/>
                    <input name="topic" type="text" placeholder="Topic" className="col-md-2"/>
                </div>
                <div className="row">
                    <input type="submit" value="Add/Modify/Delete" className=""/>
                </div>
            </form>
    );}
}

export default Form;