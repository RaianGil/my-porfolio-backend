import mongoose, { Document, Model, model, Schema } from "mongoose"
import * as env from '../../../environments'
import * as TError from '../../../libs/TError'

export interface ISimpleTrade {
  simpleTradeId?: string
  botName: string,
  cryptoSymbol: string,
  botBuy: number,
  botLimitBuy: number,
  botSell: number,
  botAmount: number,
  totalAmount: number,
  isRealWallet?: boolean,
  inOrder?: boolean,
  createdBy?: string,
  updateBy?: string,
  createdAt?: Date,
  updatedAt?: Date,
  isActive?: string,
}

interface ISimpleTradeDocument extends ISimpleTrade, Document {}

class SimpleTradeModel {
  private _model: Model<ISimpleTradeDocument>
  static instance: SimpleTradeModel

  constructor() {
    const gridTradeSchema = new Schema({
      botName: { type: String, required: true },
      cryptoSymbol: { type: String, required: true },
      botBuy: { type: Number, required: true },
      botLimitBuy: { type: Number, required: true },
      botSell: { type: Number, required: true },
      botAmount: { type: Number, required: true },
      totalAmount: { type: Number, required: true },
      isRealWallet: { type: Boolean, default: false },
      botStatus: { type: Number, default: 0 },
      createdBy: { type: String, default: "system" },
      updateBy: { type: String, default: "system" },
      createdAt: { type: mongoose.Schema.Types.Date, default: new Date(0) },
      updatedAt: { type: mongoose.Schema.Types.Date, default: new Date(0) },
      isActive: { type: Boolean, default: true },
    })

    this._model = model<ISimpleTradeDocument>("vsp003", gridTradeSchema)
  }

  public static getInstance = () => {
    if (!this.instance)
      this.instance = new SimpleTradeModel()
    return this.instance
  }

  public save = async (obj: ISimpleTrade) => {
    if(!this.validate(obj))
      return
    const insert = new this._model(obj)
    return await insert.save()
  }

  public validate = (obj: ISimpleTrade) => {
    if(obj.botAmount < env.minBuy || obj.totalAmount < env.minBuy)
      throw new TError.BadRequestError(`Min amount for trade is: ${env.minBuy}`)
    if(obj.botBuy > obj.botLimitBuy){
      const { botLimitBuy } = obj
      obj.botLimitBuy = obj.botBuy
      obj.botBuy = botLimitBuy
    }
    if(obj.botLimitBuy > obj.botSell)
      throw new TError.BadRequestError(`botLimitBuy is greater of botSell`)
    if(obj.botAmount > obj.totalAmount) {
      const { totalAmount } = obj
      obj.totalAmount = obj.botAmount
      obj.botAmount = totalAmount
    }
    return true
  }

  public find = (where: any) => this._model.find(where)
}

export default SimpleTradeModel.getInstance()