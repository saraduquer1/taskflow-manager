<!--
title: 'AWS Simple HTTP Endpoint example in NodeJS'
description: 'This template demonstrates how to make a simple HTTP API with Node.js running on AWS Lambda and API Gateway using the Serverless Framework.'
layout: Doc
framework: v4
platform: AWS
language: nodeJS
authorLink: 'https://github.com/serverless'
authorName: 'Serverless, Inc.'
authorAvatar: 'https://avatars1.githubusercontent.com/u/13742415?s=200&v=4'
-->

# Serverless Framework Node HTTP API on AWS

This template demonstrates how to make a simple HTTP API with Node.js running on AWS Lambda and API Gateway using the Serverless Framework.

This template does not include any kind of persistence (database). For more advanced examples, check out the [serverless/examples repository](https://github.com/serverless/examples/) which includes Typescript, Mongo, DynamoDB and other examples.

## Step by Step
### 1. Installations
1. If you don't have the Serverless Framework installed yet, you can install it globally using npm:

```bash
npm install -g serverless
```
2. You must install serverless offline to test endpoints locally. Run the command below:
```bash
npm install serverless-offline
```

3. Run the command below to install a modern version of sdk (sdk V3 avoids conflicts when sending requests in production)
```bash
npm install @aws-sdk/client-dynamodb @aws-sdk/lib-dynamodb
```

### 2. Run locally (Optional)
If you want to test the endpoints locally, follow these instructions:

1. It will be easier to execute dynamoDB locally using an official AWS image than other methods. Firstly, you must open Docker Desktop application in order to start running its engine. Once it's done, run the command below:
```bash
docker run --name dynamo-local -p 8000:8000 amazon/dynamodb-local -jar DynamoDBLocal.jar -sharedDb
```
This command will keep executing a new container named "dynamo-local" locally using the AWS image as reference.

2. Just after running docker container, you must open another terminal (don't kill the one where docker is running), and execute the command below to run locally this project without struggling:
```bash
npm run dev
```

### Deployment

In order to deploy the project, you just need to run the following command:

```
serverless deploy
```

After running deploy, you should see output similar to:

```
Deploying "serverless-http-api" to stage "dev" (us-east-1)

✔ Service deployed to stack taskmaster-api-dev (55s)

endpoints:
GET - https://xxxxxxxxxx.execute-api.us-east-1.amazonaws.com/
...
functions:
  getTasks: taskmaster-api-dev-getTasks (1.6 kB)
  ...
```

_IMPORTANT_: After deploy and test the available endpoints, it's MANDATORY that you kill all instances created by serverless:
```bash
serverless remove
```

_Note_: In current form, after deployment, your API is public and can be invoked by anyone. For production deployments, you might want to configure an authorizer. For details on how to do that, refer to [HTTP API (API Gateway V2) event docs](https://www.serverless.com/framework/docs/providers/aws/events/http-api).

### Sending HTTPS requests

After successful deployment, you can call the created application via HTTP:

```
curl https://xxxxxxx.execute-api.us-east-1.amazonaws.com/tasks
```

Which should result in response similar to:

```json
{ "message": "No hay tareas disponibles" }
```
