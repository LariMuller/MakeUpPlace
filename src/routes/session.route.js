import { Router } from 'express'
import { SessionController } from '../controllers/session.controller.js'

export const sessionRouter = Router()
export const sessionControl = new SessionController()

sessionRouter.post('/', sessionControl.login)
