import mongoose, { Document, Model, model, Schema } from "mongoose"
import * as env from '../../../environments'
import * as TError from '../../../libs/TError'

export interface IDailyTrade {
  dailyTradeId?: string
  botName: string,
  cryptoSymbol: string,
  botMinBuy: number,
  botNextBuy: number,
  botPercent: number,
  botPercentDecay: number,
  tradeAmount: number,
  totalAmount: number,
  isRealWallet?: boolean,
  inOrder?: boolean,
  createdBy?: string,
  updateBy?: string,
  createdAt?: Date,
  updatedAt?: Date,
  isActive?: string,
}

interface IDailyTradeDocument extends IDailyTrade, Document {}

class DailyTradeModel {
  private _model: Model<IDailyTradeDocument>
  static instance: DailyTradeModel

  constructor() {
    const gridTradeSchema = new Schema({
      botName: { type: String, required: true },
      cryptoSymbol: { type: String, required: true },
      botMinBuy: { type: Number, required: true },
      botNextBuy: { type: Number, required: true },
      botPercent: { type: Number, required: true },
      botPercentDecay: { type: Number, required: true },
      tradeAmount: { type: Number, required: true },
      totalAmount: { type: Number, required: true },
      isRealWallet: { type: Boolean, default: false },
      inOrder: { type: Boolean, default: false },
      createdBy: { type: String, default: "system" },
      updateBy: { type: String, default: "system" },
      createdAt: { type: mongoose.Schema.Types.Date, default: new Date(0) },
      updatedAt: { type: mongoose.Schema.Types.Date, default: new Date(0) },
      isActive: { type: Boolean, default: true },
    })

    this._model = model<IDailyTradeDocument>("vsp001", gridTradeSchema)
  }

  public static getInstance = () => {
    if (!this.instance)
      this.instance = new DailyTradeModel()
    return this.instance
  }

  public save = async (obj: IDailyTrade) => {
    if(!this.validate(obj))
      return
    const insert = new this._model(obj)
    return await insert.save()
  }

  public validate = (obj: IDailyTrade) => {
    if(obj.totalAmount < obj.tradeAmount){
      const { totalAmount } = obj
      obj.totalAmount = obj.tradeAmount
      obj.tradeAmount = totalAmount
    }
    if(obj.tradeAmount < env.minBuy)
      throw new TError.BadRequestError(`Min amount for trade is: ${env.minBuy}`)
    return true
  }

  public find = (where: any) => this._model.find(where)
}

export default DailyTradeModel.getInstance()