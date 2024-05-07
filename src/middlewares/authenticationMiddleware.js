import jwt from 'jsonwebtoken'

export function authenticationMiddleware (req, res, next){
    const authorization = req.headers.authorization

    if (!authorization){
        return res.status(401).json({message: "Invalid token."})
    }
    const [, token] = authorization.split(' ')
    if (!token){
        return res.status(401).json({message: "Invalid token."})
    }

    try {
    jwt.verify(token, "larissa")

        const decoded = jwt.decode(token)
        console.log (decoded)

        // {
        //     userId: 2,
        //     admin: false,
        //     email: 'larissa@gmail.com',
        //     name: 'Larissa',
        //     iat: 1715003390,
        //     exp: 1715010590
        //   }
        // {
        //     userId: 1,
        //     admin: true,
        //     email: 'larissa.muller@alpar.com.br',
        //     name: 'Larissa Muller',
        //     iat: 1715003469,
        //     exp: 1715010669
        //   }

        req.user = decoded
    next()
    }catch(e){
        return res.status(401).json({message: "Invalid token."})
    }
}