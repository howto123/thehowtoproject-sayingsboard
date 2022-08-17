import React from 'react';
import $ from 'jquery';

import { validateInputByDbAction } from '../utils/inputValidation';

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
class Form extends React.Component<FormProps, FormState> {
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

        // read values into variable
        const input = new FormData(event.target as HTMLFormElement);
        const stateWhenSubmit: FormState = {
            dbAction: input.get('action') as 'create'|'delete'|'update',
            content: {
                saying: input.get('saying') as string,
                author: input.get('author') as string,
                topic: input.get('topic') as string
            }
        }

        const isValid = validateInputByDbAction(stateWhenSubmit.dbAction, stateWhenSubmit.content);
        if(!(isValid)) {
            console.log("input not valid", isValid);
        }
        console.log("Here we are");
        console.log("isValid: ", isValid, "formState: ", stateWhenSubmit);

        // update form state
        this.setState(stateWhenSubmit);
        //console.log("dev: don't forget to restet the form...A");

        // call the submit handler of the parent
        this.props.handleFormSubmit(stateWhenSubmit);
    };

    onDbActionChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
        // read variable
        const dbAction = event.target.value as 'create'|'delete'|'update';

        // get input objects
        const inputCreate = $('#saying') as JQuery<HTMLInputElement>;
        const inputUpdate = $('#author') as JQuery<HTMLInputElement>;
        const inputDelete = $('#topic') as JQuery<HTMLInputElement>;
        
        // enable or disable input fields. this "state" is not reflected in a react state
        this.setState({'dbAction': dbAction});
        switch (dbAction) {
            case 'create': 
                inputCreate.prop('disabled', false);
                inputUpdate.prop('disabled', false);
                inputDelete.prop('disabled', false);
                break;
            case 'update': 
                inputCreate.prop('disabled', false);
                inputUpdate.prop('disabled', false);
                inputDelete.prop('disabled', false);
                break;
            case 'delete': 
                inputCreate.prop('disabled', true);
                inputUpdate.prop('disabled', true);
                inputDelete.prop('disabled', true);
                break;
            default: { /* error... */ }
        }
    }
    
    render() {
        return (
            <form name="form" className="container-fluid my-5" onSubmit={this.handleFormSubmit}>
                <p className="text-start">Please choose what you want to do:</p>
                <div className="row align-items-center justify-content-center">
                    <input type="radio" name="action" onChange={this.onDbActionChanged} className="btn-check" value="create" id="create" />
                    <label className="btn btn-outline-success col mx-2"  htmlFor="create">Add a new saying</label>
                    <input type="radio"  name="action" onChange={this.onDbActionChanged} className="btn-check" value="update" id="update" />
                    <label className="btn btn-outline-success col mx-2" htmlFor="update">Modify highlighted saying</label>
                    <input type="radio"  name="action" onChange={this.onDbActionChanged} className="btn-check" value="delete" id="delete" />
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
                        <input id="saying" name="saying" type="text" placeholder="Enter a saying to create or update"
                            className="col-md-6 text-center"/>
                        <input id="author" name="author" type="text" placeholder="And an author..." className="col-3 text-center"/>
                        <input id="topic" name="topic" type="text" placeholder="And a topic..." className="col-3 text-center"/>
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