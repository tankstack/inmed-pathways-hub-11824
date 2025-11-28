# Firebase test-user setup

This project contains a script to create a test Firebase Authentication user and a Firestore `users` document.

IMPORTANT: Creating Auth users and setting custom claims requires administrative credentials (service account). Do NOT commit service account JSON to the repo.

Steps

1. Install the Admin SDK locally if not already installed:

```bash
npm install firebase-admin
```

2. Place your Firebase service account JSON somewhere local and export the path as an environment variable.

Windows (cmd.exe):

```cmd
set GOOGLE_APPLICATION_CREDENTIALS=C:\path\to\serviceAccount.json
npm run create-test-user
```

WSL / macOS / Linux:

```bash
export GOOGLE_APPLICATION_CREDENTIALS=/home/user/serviceAccount.json
npm run create-test-user
```

You can also override the email/password with env vars:

```bash
TEST_EMAIL=you@example.com TEST_PASSWORD=pass123 npm run create-test-user
```

What the script does

- Creates the Auth user with the provided email/password if it doesn't already exist.
- Sets a custom claim `{ admin: true }` (used for server-side role checks).
- Writes/merges a document in Firestore under `users/{uid}` with `email`, `displayName`, `roles`, and `createdAt`.

If you prefer not to use the Admin SDK, you can create the user manually from the Firebase Console → Authentication, and then run a small script (client-side) to write the Firestore `users` doc. The Admin script is recommended for automated, repeatable setup.
