import { dynamoDB } from '../dynamodb';
import createHttpError from 'http-errors';
import { commonMiddleware } from '../lib/commonMiddleware';

async function getAuctions () {
    let auctions;
    const params = {
        TableName: process.env.AUCTIONS_TABLE
    };

    try {
        const data = await dynamoDB.scan(params).promise();
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

export const handler = commonMiddleware(getAuctions);