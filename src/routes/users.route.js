import { Router } from 'express'
import { UsersController } from '../controllers/users.controller.js'
import { authenticationMiddleware } from '../middlewares/authenticationMiddleware.js'
import { adminCheckMiddleware } from '../middlewares/adminCheckMiddleware.js'

export const usersRouter = Router()
export const UsersControl = new UsersController()

usersRouter.post('/', UsersControl.createUser)
usersRouter.get('/', authenticationMiddleware, adminCheckMiddleware, UsersControl.getAllUsers)
usersRouter.get('/', authenticationMiddleware,UsersControl.getUser)
usersRouter.patch('/',authenticationMiddleware ,UsersControl.updateUser)
usersRouter.delete('/',authenticationMiddleware, UsersControl.deleteUser)   