// https://www.airbnb.com/calendar/ical/1124115159193989789.ics?s=1e0f560ce9919cbaa6b94a3578a50b37

import type { NextApiRequest, NextApiResponse } from 'next';
import Cors from 'cors';

const cors = Cors({
    methods: ['GET'],
});

type MiddlewareFunction = (
    req: NextApiRequest,
    res: NextApiResponse,
    next: (result: Error | unknown) => void
) => void;

function runMiddleware(
    req: NextApiRequest,
    res: NextApiResponse,
    fn: MiddlewareFunction
) {
    return new Promise((resolve, reject) => {
        fn(req, res, (result) => {
            if (result instanceof Error) {
                return reject(result);
            }

            return resolve(result);
        });
    });
}

export default async function iCal(req: NextApiRequest, res: NextApiResponse) {
    await runMiddleware(req, res, cors);

    res.json({ message: 'Hello Everyone!' });
}
