import { Express } from 'express'
import * as authMiddle from '../../auth/middlewares'
import { body } from 'express-validator';
import service from '../services/job';
import { validateBodyErrors } from '../../../middlewares';

export class JobRoutes {
  _service
  constructor(router: Express) {
    this._service = service
    this.registerRoutes(router);
  }

  protected registerRoutes(router:Express): void {
    // router.get('/:botId', authMiddle.checkAuth, this.controller.getByClientId);
    // router.put('/:botId', authMiddle.checkAuth, this.controller.updateByClientId);
    router.get('/jobs', authMiddle.checkAuth, this._service.getAll);
    router.post('/job', authMiddle.checkAuth, this.bodyValidator(), validateBodyErrors, this._service.create);
  }

  protected bodyValidator = () => [
    body('companyName').notEmpty().withMessage("companyName is required"),
    body('name').notEmpty().withMessage("name is required"),
    body('desc').notEmpty().withMessage("desc is required").custom((value:string) => value.split('|').length > 0).withMessage("desc: Invalid Format"),
    body('tools').notEmpty().withMessage("tools is required").custom((value:string) => value.split('|').length > 0).withMessage("tools: Invalid Format"),
    body('tags').notEmpty().withMessage("tags is required").custom((value:string) => value.split('|').length > 0).withMessage("tags: Invalid Format"),
    body('dateStart').notEmpty().withMessage("dateStart is required").custom((value:string) => `${new Date(value)}` != 'Invalid Date').withMessage("dateStart: Invalid Format"),
    body('dateEnd').notEmpty().withMessage("dateEnd is required").custom((value:string) => `${new Date(value)}` != 'Invalid Date').withMessage("dateEnd: Invalid Format"),
  ]
}