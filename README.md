# Serverless Auction Service

This project is based on the nodejs aws template. There's a lot of extra notes as this is a test app to learn Serverless.

## Setup
    $ npm i -g serverless serverless-offline
- Use Postman to test endpoints

## Development
    $ sls dynamodb install # only once
    $ npm run dev # localhost:3000 
    $ sls deploy -v # shows the output of CloudFormation
    $ sls deploy -f <Function Name> -v
    $ sls deploy -f <Function Name> -l # shows the logs of the function (this function is listed as a schedule, not a regular function!)
    $ sls logs -f <Function Name> # `-t` tail log the function, `-startTime 1m` logs from 1m ago
    $ sls invoke -f <Function Name> # locally invoke the function, `-l` to get the logs that come with the function

You can invoke locally as well, but sls-offline is really like having everything on aws, without the costs. Use Postman here once you have the env running.

## Deploy
    $ sls config credentials --provider aws --key [YOUR-KEY] --secret [YOUR-SECRET] -o

The last `-o` is to overwrite in case you already added old credentials

## Database
 A local DynamoDB version is available. 

 ## Troubleshooting
 Got some weird error about the response not being stringified, when developing locally. This error did not occur when going to a dev env on aws. Tips are to usually work without a local/offline env. The speed is fast and one can have as many stages as they want
