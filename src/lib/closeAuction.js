import createHttpError from "http-errors"
import { dynamoDB } from "../dynamodb"

const closeAuction = async (auction) => {
    let updatedAuction;
    const params = {
        TableName: process.env.AUCTIONS_TABLE,
        Key: {
            id: auction.id
        },
        UpdateExpression:
            'SET #status= :status',
        ExpressionAttributeValues: {
            ':status': 'CLOSED',
        },
        ExpressionAttributeNames: {
            '#status': 'status',
        },
        ReturnValues: 'ALL_NEW',
    }
    try {
        updatedAuction = await dynamoDB.update(params).promise();
    } catch (e) {
        console.error(e);
        throw new createHttpError.InternalServerError(e);
    }

    if (!updatedAuction) {
        throw new createHttpError.NotFound(`Auction with id "${auction.id}" was not found!`)
    }

    return updatedAuction;
}