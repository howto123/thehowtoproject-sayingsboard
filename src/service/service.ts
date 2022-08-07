import { FormState } from '../components/Form';
import { SayingModel } from '../data/dataModel'

import * as BackendFunctions from '../backendApi/backendMethods';

export function getAllSayings(){
    return BackendFunctions.getAllSayings();
}

type RequestBody = {
    dbAction: 'create'|'read'|'update'|'delete'
    content: SayingModel
}

export function handleFormSubmit(stateWhenSubmit: FormState, selectedId: string){
    //first we need to build an object, that contains all necessairy information for our request
    let requestBody: RequestBody = { ...stateWhenSubmit } as RequestBody;
    Object.assign(requestBody.content, { '_id': selectedId});

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
            console.log("default");
            break;
    }
}