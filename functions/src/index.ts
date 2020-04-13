import * as functions from 'firebase-functions';

export const saveText = functions.https.onCall((data, context) => {
    console.log(data);
});