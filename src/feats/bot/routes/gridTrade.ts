import { Express } from 'express'
import * as authMiddle from '../../auth/middlewares'
import { body } from 'express-validator';
import service from '../services/gridTrade';
import { validateBodyErrors } from '../../../middlewares';

export class GridTradeRoutes {
  _service
  constructor(router: Express) {
    this._service = service
    this.registerRoutes(router);
  }

  protected registerRoutes(router:Express): void {
    // router.get('/:botId', authMiddle.checkAuth, this.controller.getByClientId);
    // router.put('/:botId', authMiddle.checkAuth, this.controller.updateByClientId);
    router.get('/GT', authMiddle.checkAuth, this._service.getAll);
    router.post('/GT', authMiddle.checkAuth, this.bodyValidator(), validateBodyErrors, this._service.create);
  }

  protected bodyValidator = () => [
    body('botName').notEmpty().withMessage("botName is required"),
    body('cryptoSymbol').notEmpty().withMessage("cryptoSymbol is required"),
    body('minPrice').isFloat().custom((value:number) => value > 0).withMessage("minPrice must be int and greater than 0."),
    body('maxPrice').isFloat().custom((value:number) => value > 0).withMessage("maxPrice must be int and greater than 0."),
    body('gridNumber').isInt().custom((value:number) => value > 0).withMessage("gridNumber must be int and greater than 0."),
    body('gridPercent').isFloat().custom((value:number) => value > 0).withMessage("gridPercent must be int and greater than 0."),
    body('totalAmount').isFloat().custom((value:number) => value > 0).withMessage("totalAmount must be int and greater than 0."),
  ]
}