import express from 'express'
import { connect } from 'mongoose'
import cors from 'cors';
import { Express, json } from "express"
import morgan from "morgan"
import * as env from '../environments'
import { JobRoutes } from '../feats/porfolio';
import { ProjectRoutes } from '../feats/porfolio/routes/project';

export class Server {
  app: Express
  constructor() {
    this.app = express()
    this.config()
  }

  private async config() {
    this.loadMiddlewares(this.app)
    this.loadRoutes(this.app)
    await connect(env.mongoUri)
  }
  private loadMiddlewares = (app:Express) => {
    app.use(json())
    app.use(cors())
    app.use(morgan("tiny"))
    app.set('port', env.port)
  }

  private loadRoutes = (app:Express) => {
    new JobRoutes(app)
    new ProjectRoutes(app)
  }
  
  public async start() {
    this.app.listen(this.app.get('port'), () => console.log('Server listening in port', this.app.get('port')));
  }
}