import { SayingModel } from '../data/dataModel';
import * as BackendFunctions from '../backendApi/backendMethods';

export function getAllSayings() {
    return BackendFunctions.getAllSayings();
}

type RequestBody = {
    dbAction: 'create' | 'read' | 'update' | 'delete';
    content: SayingModel;
};

type SubmitArgs = {
    dbAction: string;
    selectedId: string;
    inputValueSaying: string;
    inputValueAuthor: string;
    inputValueTopic: string;
};

export function handleFormSubmit(args: SubmitArgs) {
    //first we need to build an object, that contains all necessairy information for our request
    const requestBody: RequestBody = {
        dbAction: args.dbAction as 'create' | 'read' | 'update' | 'delete',
        content: {
            _id: args.selectedId,
            saying: args.inputValueSaying,
            author: args.inputValueAuthor,
            topic: args.inputValueTopic
        }
    };

    switch (requestBody.dbAction) {
        case 'create': {
            BackendFunctions.createSaying(requestBody.content);
            break;
        }
        case 'update': {
            BackendFunctions.updateSaying(requestBody.content);
            break;
        }
        case 'delete': {
            BackendFunctions.deleteSaying(requestBody.content);
            break;
        }
        default:
            break;
    }
}
