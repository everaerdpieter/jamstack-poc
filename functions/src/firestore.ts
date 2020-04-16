import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

admin.initializeApp();

export const saveUserData = functions.region('europe-west1').https.onCall(async (data, context) => {
  if (!context.auth) {
    throw new functions.https.HttpsError(
      'unauthenticated',
      'Je moet ingeloggd zijn om user data te kunnen aanpassen'
    );
  }

  await admin.firestore().collection('user').doc(context.auth.uid).set(data);
});
