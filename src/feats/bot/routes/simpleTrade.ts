import { Express } from 'express'
import * as authMiddle from '../../auth/middlewares'
import { body } from 'express-validator';
import service from '../services/simpleTrade';
import { validateBodyErrors } from '../../../middlewares';

export class SimpleTradeRoutes {
  _service
  constructor(router: Express) {
    this._service = service
    this.registerRoutes(router);
  }

  protected registerRoutes(router:Express): void {
    // router.get('/:botId', authMiddle.checkAuth, this.controller.getByClientId);
    // router.put('/:botId', authMiddle.checkAuth, this.controller.updateByClientId);
    router.get('/ST', authMiddle.checkAuth, this._service.getAll);
    router.post('/ST', authMiddle.checkAuth, this.bodyValidator(), validateBodyErrors, this._service.create);
  }

  protected bodyValidator = () => [
    body('botName').notEmpty().withMessage("botName is required"),
    body('cryptoSymbol').notEmpty().withMessage("cryptoSymbol is required"),
    body('botBuy').isFloat().custom((value:number) => value > 0).withMessage("botBuy must be int and greater than 0."),
    body('botLimitBuy').isFloat().custom((value:number) => value > 0).withMessage("botLimitBuy must be int and greater than 0."),
    body('botSell').isInt().custom((value:number) => value > 0).withMessage("botSell must be int and greater than 0."),
    body('botAmount').isFloat().custom((value:number) => value > 0).withMessage("botAmount must be int and greater than 0."),
    body('totalAmount').isFloat().custom((value:number) => value > 0).withMessage("totalAmount must be int and greater than 0."),
  ]
}