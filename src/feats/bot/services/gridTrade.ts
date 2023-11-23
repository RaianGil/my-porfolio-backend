import * as TError from '../../../libs/TError';
import model from '../models/gridTrade'
import { Request, Response } from "express";

class GridTradeService {
  static instance: GridTradeService
  constructor(){
  }

  public static getInstance() {
    if(!this.instance)
      this.instance = new GridTradeService()
    return this.instance
  }

  public create(req: Request, res: Response) {
    model.save(req.body).then(resp => res.send(resp)).catch(
      err => res.status(
        err instanceof TError.BadRequestError ? 400 : 500
      ).json({errors: [err.message]}))
  }

  public getAll = (req: Request, res: Response) => 
    model.find({}).then(resp => res.send(resp)).catch(err => res.status(500).json({errors: [err.message]}))
  
}

export  default GridTradeService.getInstance()