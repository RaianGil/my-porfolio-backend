import { Express } from 'express'
import * as authMiddle from '../../auth/middlewares'
import { body } from 'express-validator';
import service from '../services/project';
import { validateBodyErrors } from '../../../middlewares';

export class ProjectRoutes {
  _service
  constructor(router: Express) {
    this._service = service
    this.registerRoutes(router);
  }

  protected registerRoutes(router:Express): void {
    // router.get('/:botId', authMiddle.checkAuth, this.controller.getByClientId);
    // router.put('/:botId', authMiddle.checkAuth, this.controller.updateByClientId);
    router.get('/projects', authMiddle.checkAuth, this._service.getAll);
    router.post('/project', authMiddle.checkAuth, this.bodyValidator(), validateBodyErrors, this._service.create);
  }

  protected bodyValidator = () => [
    body('name').notEmpty().withMessage("name is required"),
    body('desc').notEmpty().withMessage("desc is required"),
    body('tools').notEmpty().withMessage("tools is required").custom((value:string) => value.split('|').length > 0).withMessage("tools: Invalid Format"),
    body('tags').notEmpty().withMessage("tags is required").custom((value:string) => value.split('|').length > 0).withMessage("tags: Invalid Format"),
    body('imgSrc').notEmpty().withMessage("imgSrc is required"),
  ]
}