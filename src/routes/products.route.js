import { Router } from 'express'
import { ProductsController } from '../controllers/products.controller.js'
import { authenticationMiddleware } from '../middlewares/authenticationMiddleware.js'
import { adminCheckMiddleware } from '../middlewares/adminCheckMiddleware.js'

export const productsRouter = Router()
const ProductsControl = new ProductsController()

productsRouter.get('/', ProductsControl.getAllProducts)
productsRouter.get('/:id', ProductsControl.getProduct)
productsRouter.post('/', authenticationMiddleware, adminCheckMiddleware, ProductsControl.createProduct)
productsRouter.delete('/:id', authenticationMiddleware, adminCheckMiddleware ,ProductsControl.deleteProduct)
productsRouter.patch('/:id', authenticationMiddleware, adminCheckMiddleware , ProductsControl.updateProduct)