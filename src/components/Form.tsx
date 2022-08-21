import React from 'react';
import './Form.css';

export type FormProps = {
    dbAction: string;
    setDbAction: (action: string) => void;
    inputValueSaying: string;
    setInputValueSaying: (value: string) => void;
    inputValueAuthor: string;
    setInputValueAuthor: (value: string) => void;
    inputValueTopic: string;
    setInputValueTopic: (value: string) => void;
    inputErrorText: string;
    handleFormSubmit: () => void;
    setInputFieldsToTableRow: () => void;
    setSelectedId: (id: string) => void;
};

/**
 * This form allows the user to make crud operations on the table shown via the table component.
 * (the selectedId is not in the form but needed for the backend requests. It sits on the app
 * component and being updated via the table component)
 */
class Form extends React.Component<FormProps, unknown> {
    constructor(props: FormProps) {
        super(props);
        // no state here, the state comes from the parent as props
    }

    instruction = () => {
        if (this.props.dbAction === 'create') return 'Please enter some text';
        if (this.props.dbAction === 'update') return 'Please select a saying and modify it';
        if (this.props.dbAction === 'delete') return 'Please select the saying to be deleted';
        return 'Please choose your action';
    };

    checkDisabled = () => {
        if (this.props.dbAction === 'delete') return true;
        return false;
    };

    handleCheckCreate = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.props.setDbAction(event.target.value);
        this.props.setInputValueSaying('');
        this.props.setInputValueAuthor('');
        this.props.setInputValueTopic('');
        this.props.setSelectedId('');
    };

    handleCheckUpdate = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.props.setDbAction(event.target.value);
        this.props.setInputFieldsToTableRow();
    };

    handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        this.props.handleFormSubmit();
    };

    render() {
        return (
            <form
                name="form"
                className="container-fluid my-5"
                onSubmit={(event) => this.handleSubmit(event)}>
                <p className="text-start">Please choose what you want to do:</p>
                <div className="d-flex flex-row align-middle">
                    <input
                        type="radio"
                        name="action"
                        onChange={(event) => this.handleCheckCreate(event)}
                        className="btn-check"
                        value="create"
                        id="create"
                        checked={this.props.dbAction === 'create'}
                    />
                    <label
                        className="d-flex justify-content-center btn btn-outline-success col mx-2"
                        htmlFor="create">
                        <span className="align-self-center">Add a new saying</span>
                    </label>
                    <input
                        type="radio"
                        name="action"
                        onChange={(event) => this.handleCheckUpdate(event)}
                        className="btn-check"
                        value="update"
                        id="update"
                        checked={this.props.dbAction === 'update'}
                    />
                    <label className="btn btn-outline-success col mx-2" htmlFor="update">
                        Modify highlighted saying
                    </label>
                    <input
                        type="radio"
                        name="action"
                        onChange={(event) => this.props.setDbAction(event.target.value)}
                        className="btn-check"
                        value="delete"
                        id="delete"
                        checked={this.props.dbAction === 'delete'}
                    />
                    <label className="btn btn-outline-success col mx-2" htmlFor="delete">
                        Delete highlighted saying
                    </label>
                </div>
                <br />
                <br />
                <div>
                    <p className="text-start">{this.instruction()}</p>
                    <div className="row align-items-center justify-content-center">
                        <label htmlFor="saying" className="d-none d-md-block col-md-6">
                            Saying:
                        </label>
                        <label htmlFor="author" className="d-none d-md-block col-3">
                            Author:
                        </label>
                        <label htmlFor="topic" className="d-none d-md-block col-3">
                            Topic:
                        </label>
                    </div>
                    <div className="row align-items-center justify-content-center">
                        <div className="col-md-6 p-3 border-1">
                            <label htmlFor="saying" className="d-block d-md-none input-label-small">
                                Saying:
                            </label>
                            <input
                                id="saying"
                                name="saying"
                                type="text"
                                placeholder="Enter a saying to create or update"
                                className="col-12 border-0 text-center p-0"
                                value={this.props.inputValueSaying}
                                disabled={this.checkDisabled()}
                                onChange={(event) =>
                                    this.props.setInputValueSaying(event.target.value)
                                }
                            />
                        </div>
                        <div className="col-md-3 p-3 border-1">
                            <label
                                htmlFor="author"
                                className="d-block d-md-none p-1 input-label-small">
                                Author:
                            </label>
                            <input
                                id="author"
                                name="author"
                                type="text"
                                placeholder="And an author..."
                                className="col-12 border-0 text-center p-0"
                                value={this.props.inputValueAuthor}
                                disabled={this.checkDisabled()}
                                onChange={(event) =>
                                    this.props.setInputValueAuthor(event.target.value)
                                }
                            />
                        </div>
                        <div className="col-md-3 p-3 border-1">
                            <label
                                htmlFor="topic"
                                className="d-block d-md-none p-1 input-label-small">
                                Topic:
                            </label>
                            <input
                                id="topic"
                                name="topic"
                                type="text"
                                placeholder="And a topic..."
                                className="col-12 border-0 text-center p-0"
                                value={this.props.inputValueTopic}
                                disabled={this.checkDisabled()}
                                onChange={(event) =>
                                    this.props.setInputValueTopic(event.target.value)
                                }
                            />
                        </div>
                    </div>
                    <div className="text-start text-danger">
                        <div>{this.props.inputErrorText}</div>
                    </div>
                </div>
                <br />
                <br />
                <p className="text-start">When you are done, click this button:</p>
                <div className="row">
                    <input type="submit" value="Add/Modify/Delete" className="" />
                </div>
                <br />
                <br />
            </form>
        );
    }
}

export default Form;
