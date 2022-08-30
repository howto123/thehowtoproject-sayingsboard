import { SayingModel } from '../data/dataModel';

/**
 * This file contains all functions that make REST requests to the backend.
 */

// endpoint adresses:
const url = 'https://thehowtoproject-sayingsbackend.herokuapp.com';
//const url = 'localhost:3001';
const urlGetAll = url.concat('/read');
const urlCreate = url.concat('/create');
const urlUpdate = url.concat('/update');
const urlDelete = url.concat('/delete');

export async function getAllSayings() {
    return await (
        await fetch(urlGetAll, {
            mode: 'cors',
            headers: {
                'Access-Control-Allow-Origin': '*'
            }
        })
    ).json();
}

/**
 * Makes request to make a new saying in db.
 * @param sayingObject
 */
export async function createSaying(sayingObject: SayingModel) {
    return await (
        await fetch(urlCreate, {
            mode: 'cors',
            headers: {
                'Access-Control-Allow-Origin': '*',
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify(sayingObject)
        })
    ).json();
}

/**
 * Makes request to modify an existing saying in db.
 * @params sayingObject: { _id: string, saying: string, author: string, topic: string }
 */
export async function updateSaying(sayingObject: SayingModel) {
    return await (
        await fetch(urlUpdate, {
            mode: 'cors',
            headers: {
                'Access-Control-Allow-Origin': '*',
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify(sayingObject)
        })
    ).json();
}

/**
 * Makes request to delete the saying that is passed in in db.
 * @params sayingObject: { _id: string, saying: string, author: string, topic: string }
 * @returns the deleted sayingObject if it exists or undefined
 */
export async function deleteSaying(sayingObject: SayingModel) {
    return await (
        await fetch(urlDelete, {
            mode: 'cors',
            headers: {
                'Access-Control-Allow-Origin': '*',
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify(sayingObject)
        })
    ).json();
}
