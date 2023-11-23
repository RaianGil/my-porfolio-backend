import mongoose, { Document, Model, model, Schema } from "mongoose"
import * as env from '../../../environments'
import * as TError from '../../../libs/TError'

export interface IGridTrade {
  gridTradeId?: string
  botName: string,
  cryptoSymbol: string,
  minPrice: number,
  maxPrice: number,
  gridNumber: number,
  gridPercent: number,
  totalAmount: number,
  isRealWallet?: boolean,
  inOrder?: boolean,
  createdBy?: string,
  updateBy?: string,
  createdAt?: Date,
  updatedAt?: Date,
  isActive?: string,
}

interface IGridTradeDocument extends IGridTrade, Document {}

class GridTradeModel {
  private _model: Model<IGridTradeDocument>
  static instance: GridTradeModel

  constructor() {
    const gridTradeSchema = new Schema({
      botName: { type: String, required: true },
      cryptoSymbol: { type: String, required: true },
      minPrice: { type: Number, required: true },
      maxPrice: { type: Number, required: true },
      gridNumber: { type: Number, required: true },
      gridPercent: { type: Number, required: true },
      totalAmount: { type: Number, required: true },
      isRealWallet: { type: Boolean, default: false },
      inOrder: { type: Boolean, default: false },
      createdBy: { type: String, default: "system" },
      updateBy: { type: String, default: "system" },
      createdAt: { type: mongoose.Schema.Types.Date, default: new Date(0) },
      updatedAt: { type: mongoose.Schema.Types.Date, default: new Date(0) },
      isActive: { type: Boolean, default: true },
    })

    this._model = model<IGridTradeDocument>("VSP002", gridTradeSchema)
  }

  public static getInstance = () => {
    if (!this.instance)
      this.instance = new GridTradeModel()
    return this.instance
  }

  public save = async (obj: IGridTrade) => {
    if(!this.validate(obj))
      return
    const insert = new this._model(obj)
    return await insert.save()
  }

  public validate = (obj: IGridTrade) => {
    if(obj.totalAmount / obj.gridNumber < env.minBuy)
      throw new TError.BadRequestError(`Min amount for trade is: ${env.minBuy}`)
    return true
  }

  public find = (where: any) => this._model.find(where)

}

export default GridTradeModel.getInstance()