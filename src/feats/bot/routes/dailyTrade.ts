import { Express } from 'express'
import * as authMiddle from '../../auth/middlewares'
import { body } from 'express-validator';
import service from '../services/dailyTrade';
import { validateBodyErrors } from '../../../middlewares';

export class DailyTradeRoutes {
  _service
  constructor(router: Express) {
    this._service = service
    this.registerRoutes(router);
  }

  protected registerRoutes(router:Express): void {
    // router.get('/:botId', authMiddle.checkAuth, this.controller.getByClientId);
    // router.put('/:botId', authMiddle.checkAuth, this.controller.updateByClientId);
    router.get('/DT', authMiddle.checkAuth, this._service.getAll);
    router.post('/DT', authMiddle.checkAuth, this.bodyValidator(), validateBodyErrors, this._service.create);
  }

  protected bodyValidator = () => [
    body('botName').notEmpty().withMessage("botName is required"),
    body('cryptoSymbol').notEmpty().withMessage("cryptoSymbol is required"),
    body('botMinBuy').isFloat().custom((value:number) => value > 0).withMessage("botMinBuy must be int and greater than 0."),
    body('botNextBuy').isFloat().custom((value:number) => value > 0).withMessage("botNextBuy must be int and greater than 0."),
    body('botPercent').isFloat().custom((value:number) => value > 0).withMessage("botPercent must be int and greater than 0."),
    body('botPercentDecay').isFloat().custom((value:number) => value > 0).withMessage("botPercentDecay must be int and greater than 0."),
    body('tradeAmount').isFloat().custom((value:number) => value > 0).withMessage("tradeAmount must be int and greater than 0."),
    body('totalAmount').isFloat().custom((value:number) => value > 0).withMessage("totalAmount must be int and greater than 0."),
  ]
}