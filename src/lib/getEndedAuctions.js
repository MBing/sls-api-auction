import createHttpError from 'http-errors';
import { dynamoDB } from '../dynamodb';

const getEndedAuctions = async () => {
    let endedAuctions = [];
    const now = new Date();
    const params = {
        TableName: process.env.AUCTIONS_TABLE,
        IndexName: 'statusAndEndDate',
        KeyConditionExpression: 
            '#status = :status AND endingAt <= :now',
            // Because `status` is a reserved word, you need to prefix it with `#`
        ExpressionAttributeValues: {
            ':status': 'OPEN',
            ':now': now.toISOString(),
        },
        ExpressionAttributeNames: {
            '#status': 'status',
        }
    }

    try {
        const data = await dynamoDB.query(params).promise();
        endedAuctions = data.Items;
    } catch(e) {
        console.error(e);
        throw new createHttpError.InternalServerError(e);
    }

    return endedAuctions;
};

export { getEndedAuctions };
