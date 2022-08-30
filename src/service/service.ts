import { SayingModel } from '../data/dataModel';
import * as BackendFunctions from '../backendApi/backendMethods';

export async function getAllSayings() {
    return await BackendFunctions.getAllSayings();
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

export async function handleFormSubmit(args: SubmitArgs) {
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
            await BackendFunctions.createSaying(requestBody.content);
            break;
        }
        case 'update': {
            await BackendFunctions.updateSaying(requestBody.content);
            break;
        }
        case 'delete': {
            await BackendFunctions.deleteSaying(requestBody.content);
            break;
        }
        default:
            break;
    }
}
