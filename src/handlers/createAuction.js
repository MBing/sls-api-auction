import { v4 as uuid } from 'uuid';
import dynamoDB from '../dynamodb';

async function createAuction(event, context) {
  const { title } = JSON.parse(event.body);
  const now = new Date();

  const auction = {
    id: uuid(),
    title,
    status: 'OPEN',
    createdAt: now.toISOString(),
  };

  try {
    await dynamoDB.put({
      TableName: process.env.AUCTIONS_TABLE,
      Item: auction,
    }).promise();
  } catch(e) {
    return {
      statusCode: 400,
      body: JSON.stringify({message: e}),
    };
  }
  return {
    statusCode: 201,
    body: JSON.stringify(auction),
  };
}

export const handler = createAuction;


