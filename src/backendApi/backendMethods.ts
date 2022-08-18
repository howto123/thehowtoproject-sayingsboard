import { v4 as uuidv4 } from 'uuid';

// myData reflects, what the backside will later give back
import myData from '../data/sayingObject.json';
import { SayingModel } from '../data/dataModel';

/**
 * This file contains all functions that make REST requests to the backend.
 */

//for now, data represents the database

let data: SayingModel[] = myData;

export function getAllSayings() {
    return data;
}

/**
 * Makes request to make a new saying in db.
 * @param sayingObject
 */
export function createSaying(sayingObject: SayingModel) {
    const id = String(uuidv4()).slice(0, 4);
    console.log(id);
    sayingObject._id = id;
    data.push(sayingObject);
}

/**
 * Makes request to modify an existing saying in db.
 * @params sayingObject: { _id: string, saying: string, author: string, topic: string }
 */
export function updateSaying(sayingObject: SayingModel) {
    Object.assign(
        data.find((element) => element._id === sayingObject._id) as SayingModel,
        sayingObject
    );
}

/**
 * Makes request to delete the saying that is passed in in db.
 * @params sayingObject: { _id: string, saying: string, author: string, topic: string }
 * @returns the deleted sayingObject if it exists or undefined
 */
export function deleteSaying(sayingObject: SayingModel) {
    const index = data.findIndex((element) => element._id === sayingObject._id);
    if (index > -1) {
        return data.splice(index, 1);
    }
    console.log('element does not seem to exist');
    return undefined;
}
