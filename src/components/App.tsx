import React from 'react';

import Table from './Table';
import Form from './Form';
import { FormState } from './Form';
import { SayingModel } from '../data/dataModel';
import * as Service from '../service/service';

type AppState = {
    arrayOfSayingObjects: SayingModel[];
    selectedId: string;
};

class App extends React.Component<any, AppState> {
    constructor(props: any) {
        super(props);
        // initialize state at creation of the instance -> in this app only at startup
        this.state = {
            arrayOfSayingObjects: Service.getAllSayings(),
            selectedId: ''
        };
    }

    handleFormSubmit = (stateWhenSubmit: FormState) => {
        Service.handleFormSubmit(stateWhenSubmit, this.state.selectedId);
        this.setState({ arrayOfSayingObjects: Service.getAllSayings() });
    };

    updateSelectedId = (id: string) => {
        this.setState({ selectedId: id });
    };

    render() {
        return (
            <div className="m-5">
                <Table
                    arrayOfRowObjects={this.state.arrayOfSayingObjects}
                    updateSelectedId={this.updateSelectedId}
                />
                <Form handleFormSubmit={this.handleFormSubmit} selectedId={this.state.selectedId} />
            </div>
        );
    }
}

export default App;
