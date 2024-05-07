import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient

async function main() {
    await prisma.user.upsert({
        where: {
            email: 'larissa.muller@alpar.com.br'
        },
        create: {
            name: 'Larissa Muller',
            email: 'larissa.muller@alpar.com.br',
            password: "123456",
            admin: true,
        },
        update: {}
    })

    await prisma.product.upsert({
        where: { id: 1, },
        update: {},
        create: {
            name: "Batom Bala Matte Melu",
            description: "Ele possui textura leve, ultra pigmentada, à prova de transferência e acabamento matte aveludado.",
            price: 16.99,
            imageUrl: "https://encurtador.com.br/puzIO"
        }
    })

}
main().then(async () => {
    await prisma.$disconnect()
}).catch(async (e) => {
    console.log(e)
    await prisma.$disconnect()
    process.exit()
})