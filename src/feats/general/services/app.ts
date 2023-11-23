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

  public getVersion = (req: Request, res: Response) => 
    res.send({version: (require('../../../../package.json').version)})
}
export  default JobService.getInstance()