import { Request, Response } from "express";

class HomeController {
    greetings = async (req: Request, res: Response) => {
        // console.log(req);
        res.send({ status: "suscess" });
    };
}

export default new HomeController();
