import { Request, Response } from 'express';

class HomeController {
    greetings = async (req: Request, res: Response) => {
        // (req);
        res.send({ status: 'suscess' });
    };
}

export default new HomeController();
