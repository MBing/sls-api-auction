import { dynamoDB } from '../dynamodb';
import createHttpError from 'http-errors';
import { commonMiddleware } from '../lib/commonMiddleware';
import validator from '@middy/validator';
import { schema } from '../lib/schemas/getAuctionsSchema';

async function getAuctions (event, context) {
    let auctions;
    const { status } = event.queryStringParameters;
    const params = {
        TableName: process.env.AUCTIONS_TABLE,
        IndexName: 'statusAndEndDate',
        KeyConditionExpression: '#status = :status',
        ExpressionAttributeValues: {
            ':status': status,
        },
        ExpressionAttributeNames: {
            '#status': 'status'
        }
    };

    try {
        const data = await dynamoDB.query(params).promise();
        auctions = data.Items;

    } catch (e) {
        console.error(e);
        throw new createHttpError.InternalServerError(e);
    }

    return {
        statusCode: 200,
        body: JSON.stringify(auctions)
    };
};

export const handler = commonMiddleware(getAuctions)
    .use(validator({
        inputSchema: schema,
        useDefaults: true,
    }));