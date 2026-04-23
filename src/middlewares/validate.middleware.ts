import { Request, Response, NextFunction } from 'express';
import { ZodError, ZodObject } from 'zod';

export const validate = (schema: ZodObject<any>) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse({
        body: req.body,
        query: req.query,
        params: req.params,
      });

      return next();
    } catch (err) {
      if (err instanceof ZodError) {
        return res.status(400).json({
          message: err.issues,
        });
      }

      return res.status(400).json({
        message: 'Validation error',
      });
    }
  };