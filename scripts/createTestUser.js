/**
 * Script to create a test Firebase Authentication user and a Firestore `users` document.
 *
 * Requirements:
 * - A Firebase service account JSON file path set in env var `GOOGLE_APPLICATION_CREDENTIALS`
 *   (or `SERVICE_ACCOUNT_PATH`). Do NOT commit this file to the repo.
 * - `npm install firebase-admin` in the project (run locally before using this script).
 *
 * Usage examples:
 *   WINDOWS (cmd.exe):
 *     set GOOGLE_APPLICATION_CREDENTIALS=C:\path\to\serviceAccount.json && npm run create-test-user
 *
 *   WSL / Linux / macOS:
 *     GOOGLE_APPLICATION_CREDENTIALS=/home/user/serviceAccount.json npm run create-test-user
 */

const admin = require('firebase-admin');

const serviceAccountPath = process.env.GOOGLE_APPLICATION_CREDENTIALS || process.env.SERVICE_ACCOUNT_PATH;
if (!serviceAccountPath) {
  console.error('ERROR: Set GOOGLE_APPLICATION_CREDENTIALS (or SERVICE_ACCOUNT_PATH) to your service account JSON file path.');
  process.exit(1);
}

const creds = require(serviceAccountPath);

admin.initializeApp({
  credential: admin.credential.cert(creds),
});

const email = process.env.TEST_EMAIL || 'tankstackinfo@gmail.com';
const password = process.env.TEST_PASSWORD || '1I0veTANKSTACK!';

(async () => {
  try {
    const auth = admin.auth();
    let userRecord;

    try {
      userRecord = await auth.getUserByEmail(email);
      console.log('User already exists:', userRecord.uid);
    } catch (err) {
      // If user not found, create it
      if (err.code === 'auth/user-not-found' || /user-not-found/i.test(String(err.message))) {
        userRecord = await auth.createUser({
          email,
          password,
          displayName: 'Test User',
          emailVerified: true,
        });
        console.log('Created user:', userRecord.uid);
      } else {
        throw err;
      }
    }

    // Optionally set custom claims (roles)
    try {
      await auth.setCustomUserClaims(userRecord.uid, { admin: true });
      console.log('Set custom claims { admin: true }');
    } catch (err) {
      console.warn('Could not set custom claims:', err.message || err);
    }

    // Write a Firestore users document
    const db = admin.firestore();
    const userDocRef = db.collection('users').doc(userRecord.uid);
    await userDocRef.set(
      {
        email,
        displayName: userRecord.displayName || null,
        roles: ['admin'],
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
      },
      { merge: true }
    );

    console.log('Wrote users/' + userRecord.uid + ' document');
    process.exit(0);
  } catch (err) {
    console.error('Failed:', err);
    process.exit(1);
  }
})();
