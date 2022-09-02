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
    loading: boolean;
};

class App extends React.Component<unknown, AppState> {
    constructor(props: unknown) {
        super(props);

        // All components in this app are tightly connected to each other. Therefore,
        // the entire state live here and and are given to or modified by App's children.
        this.state = {
            arrayOfSayingObjects: [],
            selectedId: '',
            dbAction: 'create',
            inputValueSaying: '',
            inputValueAuthor: '',
            inputValueTopic: '',
            inputErrorText: '',
            isFormValid: false,
            loading: true
        } as AppState;
    }

    componentDidMount() {
        // call async method
        (async () => {
            this.setState({ arrayOfSayingObjects: await Service.getAllSayings() });
            this.setState({ loading: false });
        })();
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
        (async () => {
            // check state
            if (validateForm(this.getValidationArgs())) {
                await Service.handleFormSubmit(this.getServiceArgs());
                this.setInputValueSaying('');
                this.setInputValueAuthor('');
                this.setInputValueTopic('');
            }
            // call service
            this.setState({ arrayOfSayingObjects: await Service.getAllSayings() });
        })();
    };

    // handler for changes in table row (-> editable)
    changeHandler = (field: string, newValue: string, id: string) => {
        this.setState({ selectedId: id }, () => {
            this.setInputFieldsToTableRow();
            this.setState({ dbAction: 'update' });
        });
        const row = this.state.arrayOfSayingObjects.find((e) => e._id === id);
        if (!row) throw new Error('No valid id parameter in changeHandler');
        switch (field) {
            case 'saying':
                row.saying = newValue;
                break;
            case 'author':
                row.author = newValue;
                break;
            case 'topic':
                row.topic = newValue;
                break;
            default:
                throw new Error('No valid field parameter in changeHandler');
                break;
        }
    };

    //helpers
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

    ToBeRendered = () => {
        return (
            <div className="m-5">
                <Table
                    loading={this.state.loading}
                    arrayOfRowObjects={this.state.arrayOfSayingObjects}
                    selectedId={this.state.selectedId}
                    setSelectedId={this.setSelectedId}
                    changeHandler={this.changeHandler}
                />
                <Form {...this.getFormProps()} />
                <div className="text-start">
                    <p>
                        frontend:{' '}
                        <a href="https://github.com/howto123/thehowtoproject-sayingsboard/">
                            https://github.com/howto123/thehowtoproject-sayingsboard/
                        </a>{' '}
                        <br />
                        backend:{' '}
                        <a href="https://github.com/howto123/thehowtoproject-sayings-backend">
                            https://github.com/howto123/thehowtoproject-sayings-backend
                        </a>
                    </p>
                </div>
            </div>
        );
    };

    render() {
        return <this.ToBeRendered />;
    }
}

export default App;
