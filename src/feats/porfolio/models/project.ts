import mongoose, { Document, Model, model, Schema } from "mongoose"
import * as env from '../../../environments'
import * as TError from '../../../libs/TError'

export interface IJob {
  projectId?: string
  name: string,
  desc: string,
  tools: string[] | string,
  tags: string[] | string,
  imgSrc: string,
  createdBy?: string,
  updateBy?: string,
  createdAt?: Date,
  updatedAt?: Date,
  isActive?: string,
}

interface IJobDocument extends IJob, Document {}

class JobModel {
  private _model: Model<IJobDocument>
  static instance: JobModel

  constructor() {
    const gridTradeSchema = new Schema({
      name: { type: String, required: true },
      desc: { type: String, required: true },
      tools: { type: [String], required: true },
      tags: { type: [String], required: true },
      imgSrc: { type: String, required: true },
      createdBy: { type: String, default: "system" },
      updateBy: { type: String, default: "system" },
      createdAt: { type: mongoose.Schema.Types.Date, default: Date.now },
      updatedAt: { type: mongoose.Schema.Types.Date, default: Date.now },
      isActive: { type: Boolean, default: true },
    })

    this._model = model<IJobDocument>("vsp002", gridTradeSchema)
  }

  public static getInstance = () => {
    if (!this.instance)
      this.instance = new JobModel()
    return this.instance
  }

  public save = async (obj: IJob) => {
    // if(!this.validate(obj))
    //   return
    obj.tags = typeof obj.tags == 'string' ? obj.tags.split("|") : obj.tags
    obj.tools = typeof obj.tools == 'string' ? obj.tools.split("|") : obj.tools
    const insert = new this._model(obj)
    return await insert.save()
  }

  // public validate = (obj: IJob) => {
  //   if(obj.totalAmount < obj.tradeAmount){
  //     const { totalAmount } = obj
  //     obj.totalAmount = obj.tradeAmount
  //     obj.tradeAmount = totalAmount
  //   }
  //   if(obj.tradeAmount < env.minBuy)
  //     throw new TError.BadRequestError(`Min amount for trade is: ${env.minBuy}`)
  //   return true
  // }
  public find = (where: any) => this._model.find(where)
}

export default JobModel.getInstance()