import { dynamoDB } from '../dynamodb';
import createHttpError from 'http-errors';
import { commonMiddleware } from '../lib/commonMiddleware';

export const getAuctionById = async (id) => {
    let auction;
    const params = {
        TableName: process.env.AUCTIONS_TABLE,
        Key: {
            id,
        },
    };

    try {
        const data = await dynamoDB.get(params).promise();
        auction = data.Item;
    } catch (e) {
        console.error(e);
        throw new createHttpError.InternalServerError(e);
    }

    if (!auction) {
        throw new createHttpError.NotFound(`Auction with ID "${id}" not found!`);
    }

    return auction;
};

async function getAuction (event, context) {
    const { id } = event.pathParameters;
    const auction = await getAuctionById(id);

    return {
        statusCode: 200,
        body: JSON.stringify(auction)
    };
};

export const handler = commonMiddleware(getAuction);
