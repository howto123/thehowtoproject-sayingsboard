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
 * (the selectedId is not in the form but needed for the backend requests. It sits on the app
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

    componentDidMount() {
        // initializing the checked button after mount
        (document.getElementById('create') as HTMLInputElement).checked = true;
        }

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

    changeChecked = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({'dbAction': event.target.value as 'create'|'delete'|'update'});
    }
    
    render() {
        return (
            <form name="form" className="container-fluid my-5" onSubmit={this.handleFormSubmit}>
                <p className="text-start">Please choose what you want to do:</p>
                <div className="row align-items-center justify-content-center">
                    <input type="radio"  name="action" onChange={this.changeChecked} className="btn-check" value="create" id="create" />
                    <label className="btn btn-outline-success col mx-2"  htmlFor="create">Add a new saying</label>
                    <input type="radio"  name="action" onChange={this.changeChecked} className="btn-check" value="update" id="update" />
                    <label className="btn btn-outline-success col mx-2" htmlFor="update">Modify highlighted saying</label>
                    <input type="radio"  name="action" onChange={this.changeChecked} className="btn-check" value="delete" id="delete" />
                    <label className="btn btn-outline-success col mx-2" htmlFor="delete">Delete highlighted saying</label>
                </div>
                <br /><br />
                <div>
                    <p className="text-start">If necessairy, enter the required text:</p>
                    <div className="row align-items-center justify-content-center">
                        <label htmlFor="saying" className="col-md-6">Saying: </label>
                        <label htmlFor="author" className="col-3">Author: </label>
                        <label htmlFor="topic" className="col-3">Topic: </label>
                    </div>
                    <div className="row align-items-center justify-content-center">
                        <input id="saying" name="saying" type="text" placeholder="Saying (mandatory)"
                            className="col-md-6 text-center"/>
                        <input id="author" name="author" type="text" placeholder="Author" className="col-3 text-center"/>
                        <input id="topic" name="topic" type="text" placeholder="Topic" className="col-3 text-center"/>
                    </div>
                </div>
                <br /><br />
                <p className="text-start">When you are done, click this button:</p>
                <div className="row">
                    <input type="submit" value="Add/Modify/Delete" className=""/>
                </div>
                <br /><br />
            </form>
    );}
}

export default Form;