# Ironboost Application

# Build

```bash
yarn
yarn start
```

# Config

Set up a firebase project and add it in `firebase.js`.

The dependencies:

- SendGrid with an API Key.
- Google Sheets with a client ID and a client secret for OAuth2, and a sheet ID in which one to write.

# The configuration

```bash
firebase functions:config:set sendgrid.from="paris@ironhack.com" sendgrid.key="API_KEY"
firebase functions:config:set postulate.sender="internal-paris@ironhack.com"
firebase functions:config:set sheets.client_id="CLIENT_ID" sheets.client_secret="CLIENT_SECRET" sheets.sheet_id="SHEET_ID"
```

# Deployment

```bash
firebase deploy
```
