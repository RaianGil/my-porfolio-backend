import * as TError from '../../../libs/TError';
import model from '../models/feedback'
import { Request, Response } from "express";

class JobService {
  static instance: JobService
  constructor(){
  }

  public static getInstance() {
    if(!this.instance)
      this.instance = new JobService()
    return this.instance
  }

  public create(req: Request, res: Response) {
    model.save(req.body).then(resp => res.send(resp)).catch(
      err => res.status(
        err instanceof TError.BadRequestError ? 400 : 500
      ).json({errors: [err.message]}))
  }
  public demo = (req: Request, res: Response) => res.send({msg: req.body.img})
  public getAll = (req: Request, res: Response) => 
    model.find({}).then(resp => res.send(resp)).catch(err => res.status(500).json({errors: [err.message]}))
}
export  default JobService.getInstance()