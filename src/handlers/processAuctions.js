import createHttpError from "http-errors";
import { getEndedAuctions } from "../lib/getEndedAuctions";

const processAuctions = async (event, context) => {
    
    try {
        const auctionsToClose = await getEndedAuctions();
        closePromises = auctionsToClose.map(auction => closeAuction(auction));
        await Promise.all(closePromises)

        return { 
            closed: closePromises.length
        };
    } catch (e) {
        console.error(e);
        throw new createHttpError.InternalServerError(e);
    }

    console.log('processing auctions!', auctionsToClose);
};

export const handler = processAuctions;
