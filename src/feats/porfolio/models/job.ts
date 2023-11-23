import mongoose, { Document, Model, model, Schema } from "mongoose"
import * as env from '../../../environments'
import * as TError from '../../../libs/TError'

export interface IJob {
  jobId?: string
  companyName: string,
  name: string
  desc: string[] | string,
  tools: string[] | string,
  tags: string[] | string,
  dateStart: Date,
  dateEnd: Date,
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
      companyName: { type: String, required: true },
      name: { type: String, required: true },
      desc: { type: [String], required: true },
      tools: { type: [String], required: true },
      tags: { type: [String], required: true },
      dateStart: { type: mongoose.Schema.Types.Date, required: true },
      dateEnd: { type: mongoose.Schema.Types.Date },
      createdBy: { type: String, default: "system" },
      updateBy: { type: String, default: "system" },
      createdAt: { type: mongoose.Schema.Types.Date, default: Date.now },
      updatedAt: { type: mongoose.Schema.Types.Date, default: Date.now },
      isActive: { type: Boolean, default: true },
    })

    this._model = model<IJobDocument>("vsp001", gridTradeSchema)
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
    obj.desc = typeof obj.desc == 'string' ? obj.desc.split("|") : obj.desc
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