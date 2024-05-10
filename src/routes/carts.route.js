import { Router } from 'express'
import { CartsController } from '../controllers/carts.controller.js'
import { authenticationMiddleware } from '../middlewares/authenticationMiddleware.js'
import { adminCheckMiddleware } from '../middlewares/adminCheckMiddleware.js'

export const cartsRouter = Router()
const CartsControl = new CartsController()

cartsRouter.get('/closed', authenticationMiddleware, CartsControl.getCarts)
cartsRouter.get('/', authenticationMiddleware, CartsControl.getCarts)
cartsRouter.post('/', authenticationMiddleware, CartsControl.createCart)
cartsRouter.get('/:id', authenticationMiddleware, CartsControl.getCart)
cartsRouter.patch('/', authenticationMiddleware, CartsControl.updateCart)
cartsRouter.delete('/:productId', authenticationMiddleware, CartsControl.deleteCart)