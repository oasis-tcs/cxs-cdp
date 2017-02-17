# contextserver-graphql-api
The new GraphQL API for the OASIS Context Server specification

## Status

This project is really at a very early stage, for the moment only a basic work-in-progress schema is in place, 
there is no implementation of queries, mutations or subscriptions nor is there any root objects to query.

## Launching
To test the server simply launch

    npm install
    node index.js
    
You can then connect a browser to the following URL:

    http://localhost:4000/graphql
    