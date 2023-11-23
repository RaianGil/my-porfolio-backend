import { Express } from 'express'
import * as authMiddle from '../../auth/middlewares'
import { body } from 'express-validator';
import service from '../services/app';
import { validateBodyErrors } from '../../../middlewares';

export class AppRoutes {
  _service
  constructor(router: Express) {
    this._service = service
    this.registerRoutes(router);
  }

  protected registerRoutes(router:Express): void {
    router.get('/app/version', authMiddle.checkAuth, this._service.getVersion);
  }
}