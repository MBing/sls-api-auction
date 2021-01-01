# Serverless Auction Service

This project is based on the nodejs aws template.

## Setup
    $ npm i -g serverless serverless-offline
- Use Postman to test endpoints

## Development
    $ sls dynamodb install # only once
    $ npm run dev # localhost:3000 

You can invoke locally as well, but sls-offline is really like having everything on aws, without the costs. Use Postman here once you have the env running.

## Deploy
    $ sls config credentials --provider aws --key [YOUR-KEY] --secret [YOUR-SECRET] -o

The last `-o` is to overwrite in case you already added old credentials

## Database
 A local DynamoDB version is available. 