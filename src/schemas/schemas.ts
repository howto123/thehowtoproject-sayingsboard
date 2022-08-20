import * as Yup from 'yup';

// settings
const sayingMin = 10;
const sayingMax = 100;
const authorMin = 5;
const autghorMax = 25;
const topicMin = 3;
const topicMax = 25;

// define the schemas that will be tested later in the function
export const dbActionSchema = Yup.string()
    .matches(/(create|update|delete)/)
    .required();
export const contentSchemaCreate = Yup.object({
    saying: Yup.string().min(sayingMin).max(sayingMax).required('Please put some text.'),
    author: Yup.string().min(authorMin).max(autghorMax),
    topic: Yup.string().min(topicMin).max(topicMax)
})
    .noUnknown(true)
    .strict();
export const contentSchemaUpdate = Yup.object({
    // this could be improved so that at least one string needs to be non-empty
    saying: Yup.string().min(sayingMin).max(sayingMax),
    author: Yup.string().min(authorMin).max(autghorMax),
    topic: Yup.string().min(topicMin).max(topicMax)
})
    .noUnknown()
    .strict();
