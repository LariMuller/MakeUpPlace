import { PrismaClient } from "@prisma/client"

export class CartsRepository {
    constructor() {
        this.prisma = new PrismaClient()
    }

    async createCart({ userId, productId }) {
        const cartExists = await this.getCart(userId)

        const product = await this.prisma.product.findUnique({
            where: {
                id: productId
            }
        })

        if (cartExists) {
            let cartItem = await this.prisma.cartItem.findFirst({
                where: { cartId: cartExists.id, productId }
            })
            if (!cartItem) {
                cartItem = await this.prisma.cartItem.create({
                    data: {
                        price: product.price,
                        quantity: 1,
                        productId: productId,
                        cartId: cartExists.id
                    }
                })
            }

            await this.prisma.cartItem.update({
                where: { id: cartItem.id },
                data: {
                    quantity: cartItem.quantity + 1
                }
            })

            const cart = await this.prisma.cart.findUnique({
                where: { id: cartExists.id },
                include: {
                    items: true
                }
            })
            return cart
        }

        const cart = await this.prisma.cart.create({
            data: {
                userId,
                closed: false,
                items: {
                    create: {
                        price: product.price,
                        quantity: 1,
                        product: {
                            connect: { id: productId }
                        }
                    }
                }
            },
            include: {
                items: true
            }
        })
        return cart
    }

    async getClosedCarts(userId) {
        const carts = await this.prisma.cart.findMany({
            where: {
                userId,
                closed: true
            },
            include: {
                items: true
            }
        })
        return carts
    }

    async getCart(userId) {
        const cart = await this.prisma.cart.findFirst({
            where: {
                userId,
                OR: [{ closed: false }, { closed: null }]
            }, include: {
                items: true
            }
        })
        return cart
    }

    async updateCart({ userId, productId, quantity}) {
        const cartExists = await this.getCart(userId)

        let cartItem = await this.prisma.cartItem.update({
            where: { cartId: cartExists.id, productId },
            data: {
                quantity
            }
        })

        if (!cartItem){
            const product = await  this.prisma.product.findUnique({where: { id: productId}})
            cartItem = await this.prisma.cartItem.create({
                data: {
                    productId,
                    cartId: cartExists.id,
                    quantity,
                    price: product.price,
                }
            })
        }

        const cart = await this.getCart(userId)

        return cart
    }

    async deleteCart({userId, productId}) {
        const cart = await this.getCart(userId)
        await this.prisma.cartItem.delete({ where: { cartId: cart.id, productId } })
    }
}