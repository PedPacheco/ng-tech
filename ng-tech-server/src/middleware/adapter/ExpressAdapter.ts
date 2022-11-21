import { NextFunction, Request, Response } from "express";

export const expressAdapter = function (moduleFn: any) {
  return async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> => {
    try {
      const controller = moduleFn();
      const response = await controller.handle(req.params, req.query, req.body);

      res.json(response);
    } catch (error) {
      console.error(error);
      res.status(400).send(error);
    }
  };
};
