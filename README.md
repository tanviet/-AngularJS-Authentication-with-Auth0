# AngularJS Authentication with Auth0

This repo shows how to implement authentication in an AngularJS 1.x application with Auth0.

## Installation and Running the App

Clone the repo, then:
```bash
npm install
npm install -g http-server
npm install -g nodemon
```

You will need an Auth0 account to run the example. [Sign up](https://auth0.com/signup) for a free account and then go to your [dashboard](https://manage.auth0.com) to get your credentials.

Do not forget to add `http://localhost:8080` into **Allowed Origins (CORS)** section in Settings page of the application which you are using.

Enter your domain and client ID for the front end.

```js
// client/app.js

...

// Initialize Auth0 configuration
authProvider.init({
  domain: 'YOUR_AUTH0_DOMAIN',
  clientID: 'YOUR_AUTH0_CLIENT_ID'
});

...
```

Then enter your client ID and client secret for the **express-jwt** middleware in the backend.

```js
// server/server.js

...

var authCheck = jwt({
  secret: new Buffer('YOUR_AUTH0_SECRET', 'base64'),
  audience: 'YOUR_AUTH0_CLIENT_ID'
});

...
```

With your credentials in place, you can run the app.

```bash
# Run the server
nodemon server/server.js

# Run the front-end (in a new console tab)
cd ..
http-server
```

And eventually you open the browser and access the address `http://localhost:8080/#/home` to see the app