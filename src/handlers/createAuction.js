import { v4 as uuid } from 'uuid';
import { dynamoDB } from '../dynamodb';
import { commonMiddleware } from '../lib/commonMiddleware';
import createHttpError from 'http-errors';

async function createAuction(event, context) {
  const { title } = event.body;
  const now = new Date();
  const endDate = new Date();
  endDate.setHours(now.getHours() + 1);

  const auction = {
    id: uuid(),
    title,
    status: 'OPEN',
    createdAt: now.toISOString(),
    endingAt: endDate.toISOString(),
    highestBid: {
      amount: 0,
    },
  };

  const params = {
    TableName: process.env.AUCTIONS_TABLE,
    Item: auction,
  };

  try {
    await dynamoDB.put(params).promise();
  } catch(e) {
    console.error(e);
    throw new createHttpError.InternalServerError(e);
  }

  return {
    statusCode: 201,
    body: JSON.stringify(auction),
  };
}

export const handler = commonMiddleware(createAuction);


