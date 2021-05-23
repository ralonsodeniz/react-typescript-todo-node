import { NextFunction, Request, Response } from 'express';

export default (err: Error, _: Request, res: Response, _2: NextFunction) => {
  res.status(500).json({ message: err.message });
};
