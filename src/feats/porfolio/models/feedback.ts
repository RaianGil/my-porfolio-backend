import mongoose, { Document, Model as IModel, model, Schema } from "mongoose"
import * as env from '../../../environments'
import * as TError from '../../../libs/TError'

export interface IFeedback {
  feedbackId?: string
  name?: string,
  desc: string,
  createdBy?: string,
  updateBy?: string,
  createdAt?: Date,
  updatedAt?: Date,
  isActive?: string,
}

interface IDocument extends IFeedback, Document {}

class Model {
  private _model: IModel<IDocument>
  static instance: Model

  constructor() {
    const gridTradeSchema = new Schema({
      name: { type: String },
      desc: { type: String, required: true },
      createdBy: { type: String, default: "system" },
      updateBy: { type: String, default: "system" },
      createdAt: { type: mongoose.Schema.Types.Date, default: Date.now },
      updatedAt: { type: mongoose.Schema.Types.Date, default: Date.now },
      isActive: { type: Boolean, default: true },
    })

    this._model = model<IDocument>("vsp003", gridTradeSchema)
  }

  public static getInstance = () => {
    if (!this.instance)
      this.instance = new Model()
    return this.instance
  }

  public save = async (obj: IFeedback) => {
    // if(!this.validate(obj))
    //   return
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

export default Model.getInstance()