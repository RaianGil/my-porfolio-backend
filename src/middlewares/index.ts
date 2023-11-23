import { NextFunction, Request, Response } from "express"
import { validationResult } from "express-validator"

export const validateBodyErrors = (req: Request, res: Response, next: NextFunction) => 
  validationResult(req).isEmpty() ? next() : res.status(400).json({ errors: validationResult(req).array() })