import { Express } from 'express'
import * as authMiddle from '../../auth/middlewares'
import { body } from 'express-validator';
import service from '../services/feedback';
import { validateBodyErrors } from '../../../middlewares';

export class FeedbackRoutes {
  _service
  constructor(router: Express) {
    this._service = service
    this.registerRoutes(router);
  }

  protected registerRoutes(router:Express): void {
    // router.get('/:botId', authMiddle.checkAuth, this.controller.getByClientId);
    // router.put('/:botId', authMiddle.checkAuth, this.controller.updateByClientId);
    router.get('/feedbacks', authMiddle.checkAuth, this._service.getAll);
    router.post('/feedback', authMiddle.checkAuth, this.bodyValidator(), validateBodyErrors, this._service.create);
  }

  protected bodyValidator = () => [
    body('desc').notEmpty().withMessage("desc is required")
  ]
}