import { dynamoDB } from '../dynamodb';
import createHttpError from 'http-errors';
import { commonMiddleware } from '../lib/commonMiddleware';
import { getAuctionById } from './getAuction';

async function placeBid (event, context) {
    let updatedAuction;
    const { amount } = event.body;
    const { id } = event.pathParameters;
    const auction = await getAuctionById(id);
    const currentHighestBid = auction.highestBid.amount;

    if (currentHighestBid > amount) {
        throw new createHttpError.Forbidden(`Your bid of ${amount} is not higher than ${currentHighestBid}`);
    }

    const params = {
        TableName: process.env.AUCTIONS_TABLE,
        Key: {
            id,
        },
        UpdateExpression:
            'SET highestBid.amount = :amount',
        ExpressionAttributeValues: {
            ':amount': amount,
        },
        ReturnValues: 'ALL_NEW',
    };

    try {
        const data = await dynamoDB.update(params).promise();
        updatedAuction = data.Attributes;
    } catch (e) {
        console.error(e);
        throw new createHttpError.InternalServerError(e);
    }

    if (!updatedAuction) {
        throw new createHttpError.NotFound(`Auction with ID "${id}" not found!`);
    }

    return {
        statusCode: 200,
        body: JSON.stringify(updatedAuction)
    };
};

export const handler = commonMiddleware(placeBid);
