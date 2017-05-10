# Devoxx-API-Router

This API routes private api calls to devoxx and authenicates them.

Link to the live website: http://bit.ly/personal-devoxx

## Usage

You will need to setup a local wiremock server. We've provided some sample 'mappings'
in /test/wiremock/mappings.

Once this is done. Export the WIREMOCK_SERVER environment variable.
```bash
npm install
export WIREMOCK_SERVER=http://localhost:1234
# use your wiremock URL
npm start
```

#Testing
The testing frameworks used for this API are Supertest, Mocha and Chai.
To run these tests clone the repo and run the following command:
```bash
mocha
`````

Come and work with us: https://www.uk.capgemini.com/
