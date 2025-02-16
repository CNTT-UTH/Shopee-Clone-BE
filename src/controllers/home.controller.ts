import { Request, Response } from 'express';

export class HomeController {
    greetings = async (req: Request, res: Response) => {
        // (req);
        res.send({ status: 'suscess' });
    };
}
