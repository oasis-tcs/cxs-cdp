# Context Server GraphQL API
The new GraphQL API for the OASIS Context Server specification, including sample test implementations
in Javascript and Java

## Status

Early Javascript and Java projects are now available. They mostly serve as shells for the work
on the actual API specification and should not be considered stable.

## JavaScript server

### Requirements

- NodeJS 6.9+
- NPM 4.1+

### Building and launching

To test the server simply launch

    npm install
    node index.js
    
You can then connect a browser to the following URL:

    http://localhost:4000/graphql
    
## Java server

### Requirements

- Java 8+
- Maven 3.3+
    
### Building and launching

To build and run use the script:

    ./buildAndRun.sh

If you just want to build use : 

    mvn clean install
    
The generated package is available in : 

    package/target/cxs-graphql-api-package-VERSION.tar.gz(.zip)