import * as Yup from 'yup';

/**
 * function that validates the user input if it matches the schemas
 * @param {*} dbAction
 * @param {*} formContent
 * @returns
 */
export function validateInputByDbAction(dbAction, formContent) {
    console.log('validation called: ', dbAction, formContent);

    // settings
    const sayingMin = 10;
    const sayingMax = 100;
    const authorMin = 5;
    const autghorMax = 25;
    const topicMin = 3;
    const topicMax = 25;

    // define the schemas that will be tested later in the function

    const dbActionSchema = Yup.string()
        .required()
        .matches('create' || 'update' || 'delete');
    const contentSchemaCreate = Yup.object({
        saying: Yup.string().min(sayingMin).max(sayingMax).required('Please put some text.'),
        author: Yup.string().min(authorMin).max(autghorMax),
        topic: Yup.string().min(topicMin).max(topicMax)
    });
    const contentSchemaUpdate = Yup.object({
        // this could be improved so that at least one string needs to be non-empty
        saying: Yup.string().min(10).max(100),
        author: Yup.string().min(5).max(25),
        topic: Yup.string().min(3).max(25)
    });
    const contentSchemaDelete = Yup.object({
        saying: Yup.string().max(0),
        author: Yup.string().max(0),
        topic: Yup.string().max(0)
    });

    // test dbAction
    try {
        if (!dbActionSchema.validateSync(dbAction)) {
            console.log('dbAction not correct: ', dbAction);
            return false;
        }
    } catch (err) {
        console.log('we have a problem with dbAction');
        //console.log(err);
    }

    // test formContent
    try {
        switch (dbAction) {
            case 'create':
                if (contentSchemaCreate.validateSync(formContent)) {
                    return true;
                }
                console.log('create schema not matched: ', formContent);
                break;
            case 'update':
                if (contentSchemaUpdate.validateSync(formContent)) {
                    return true;
                }
                console.log('update schema not matched: ', formContent);
                break;
            case 'delete':
                if (contentSchemaDelete.validateSync(formContent)) {
                    return true;
                }
                console.log('delete schema not validateSync: ', formContent);
                break;
            default: {
                return false;
            }
        }
    } catch (err) {
        console.dir('we have a problem with formContent: ', err.message);
    }

    // if the function has not returned yet, the formContent has not matched the corresponding schema
    return false;
}
