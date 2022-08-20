/**
 * function that validates the user input if it matches the schemas
 * @param {*} dbAction
 * @param {*} formContent
 * @returns
 */

import * as Yup from 'yup';
import { dbActionSchema, contentSchemaCreate, contentSchemaUpdate } from '../schemas/schemas';

type Args = {
    dbAction: string;
    inputValueSaying: string;
    inputValueAuthor: string;
    inputValueTopic: string;
    setInputErrorText: (errorMessage: string) => void;
    setIsFormValid: (trueOrFalse: boolean) => void;
};
export function validateForm(args: Args) {
    const content = {
        saying: args.inputValueSaying,
        author: args.inputValueAuthor,
        topic: args.inputValueTopic
    };
    // check dbAction
    try {
        dbActionSchema.validateSync(args.dbAction);
    } catch (err) {
        args.setInputErrorText(
            'Some internal error might have happened: ' + (err as Yup.ValidationError).message
        );
    }
    // check content in function of dbAction
    try {
        if (args.dbAction === 'create') {
            contentSchemaCreate.validateSync(content);
        }
        if (args.dbAction === 'update') {
            contentSchemaUpdate.validateSync(content);
        }
        // no validation for dbAction==='delete' as input is not important

        // if the validation does not throw any error:
        args.setInputErrorText('');
        return true;
    } catch (err) {
        args.setInputErrorText((err as Yup.ValidationError).message);
    }
    return false;
}
