import React from 'react';

import Table from './Table';
import Form from './Form';
import { SayingModel } from '../data/dataModel';
import * as Service from '../service/service';
import { validateForm } from '../utils/inputValidation';

type AppState = {
    arrayOfSayingObjects: SayingModel[];
    selectedId: string; // empty string means no row is selected and highlighted
    dbAction: string;
    inputValueSaying: string;
    inputValueAuthor: string;
    inputValueTopic: string;
    inputErrorText: string;
    isFormValid: boolean;
};

class App extends React.Component<unknown, AppState> {
    constructor(props: unknown) {
        super(props);

        // All components in this app are tightly connected to each other. Therefore,
        // the entire state live here and and are given to or modified by App's children.
        this.state = {
            arrayOfSayingObjects: Service.getAllSayings(),
            selectedId: '',
            dbAction: 'create',
            inputValueSaying: '',
            inputValueAuthor: '',
            inputValueTopic: '',
            inputErrorText: '',
            isFormValid: false
        } as AppState;
    }

    // setters for the entire state
    setSelectedId = (id: string) => {
        // only update when dbAction is 'update' or 'delete'
        if (this.state.dbAction !== 'create') {
            this.setState({ selectedId: id }, () => {
                //callback, after state is set: update inputfields if necessairy
                if (this.state.dbAction === 'update') this.setInputFieldsToTableRow();
            });
        }
    };

    setDbAction = (action: string) => {
        this.setState({ dbAction: action });
    };

    setInputValueSaying = (saying: string) => {
        this.setState({ inputValueSaying: saying });
    };

    setInputErrorText = (errorMessage: string) => {
        this.setState({ inputErrorText: errorMessage });
    };

    setInputValueAuthor = (author: string) => {
        this.setState({ inputValueAuthor: author });
    };

    setInputValueTopic = (topic: string) => {
        this.setState({ inputValueTopic: topic });
    };

    setIsFormValid = (trueOrFalse: boolean) => {
        this.setState({ isFormValid: trueOrFalse });
    };

    // event handlers

    /**
     * This handler calls service method if user input is valid.
     */
    handleFormSubmit = () => {
        // check state
        if (validateForm(this.getValidationArgs())) {
            Service.handleFormSubmit(this.getServiceArgs());
            this.setInputValueSaying('');
            this.setInputValueAuthor('');
            this.setInputValueTopic('');
        }
        // call service
        this.setState({ arrayOfSayingObjects: Service.getAllSayings() });
    };

    getValidationArgs = () => {
        return {
            dbAction: this.state.dbAction,
            inputValueSaying: this.state.inputValueSaying,
            inputValueAuthor: this.state.inputValueAuthor,
            inputValueTopic: this.state.inputValueTopic,
            setInputErrorText: this.setInputErrorText,
            setIsFormValid: this.setIsFormValid
        };
    };

    getServiceArgs = () => {
        return {
            dbAction: this.state.dbAction,
            selectedId: this.state.selectedId,
            inputValueSaying: this.state.inputValueSaying,
            inputValueAuthor: this.state.inputValueAuthor,
            inputValueTopic: this.state.inputValueTopic
        };
    };

    // functionality
    setInputFieldsToTableRow = () => {
        const row = this.state.arrayOfSayingObjects.find((e) => e._id === this.state.selectedId);
        if (row) {
            this.setInputValueSaying(row.saying);
            this.setInputValueAuthor(row.author);
            this.setInputValueTopic(row.topic);
        }
    };

    getFormProps = () => {
        // this object bundels form props
        return {
            dbAction: this.state.dbAction,
            setDbAction: this.setDbAction,
            inputValueSaying: this.state.inputValueSaying,
            setInputValueSaying: this.setInputValueSaying,
            inputValueAuthor: this.state.inputValueAuthor,
            setInputValueAuthor: this.setInputValueAuthor,
            inputValueTopic: this.state.inputValueTopic,
            setInputValueTopic: this.setInputValueTopic,
            inputErrorText: this.state.inputErrorText,
            handleFormSubmit: this.handleFormSubmit,
            setInputFieldsToTableRow: this.setInputFieldsToTableRow,
            setSelectedId: this.setSelectedId
        };
    };

    render() {
        return (
            <div className="m-5">
                <Table
                    arrayOfRowObjects={this.state.arrayOfSayingObjects}
                    selectedId={this.state.selectedId}
                    setSelectedId={this.setSelectedId}
                />
                <Form {...this.getFormProps()} />
            </div>
        );
    }
}

export default App;
