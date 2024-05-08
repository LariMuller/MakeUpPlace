import { CartsRepository } from "../repositories/carts.repository.js"

export class CartsController {
    static instance
    constructor() {
        this.repository = new CartsRepository()
    }

    getClosedCarts = async (req, res) => {
        const userId = req.user.userId
        const carts = await this.repository.getClosedCarts(userId)
        return res.json(carts)
    }

    getCart = async (req, res) => {
        const userId = req.user.userId
        const cart = await this.repository.getCart(userId)
        return res.json(cart)
    }

    createCart = async (req, res) => {
        const cart = req.body
        const userId = req.user.userId
        
        const createdProduct = await this.repository.createCart({...cart, userId})

        return res.json(createdProduct)
    }

    updateCart = async (req, res) => {
        const cart = req.body
        const userId = req.user.userId
        const cartUpdated = await this.repository.updateCart({ ...cart, userId})

        return res.json(cartUpdated)
    }

    deleteCart = async (req, res) => {
        const userId = req.user.userId
        const productId = Number(req.params.productId)
        await this.repository.deleteCart({productId, userId})
        return res.json({ ok: true })
    }
}