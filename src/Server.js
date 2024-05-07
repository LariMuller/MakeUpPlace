import e from 'express';
import cors from 'cors'
import { usersRouter } from './routes/users.route.js';
import { productsRouter } from './routes/products.route.js'
import { sessionRouter } from './routes/session.route.js';
import bodyParser from 'body-parser';

export class Server {
    constructor(port) {
        this.app = e();

        this.setMiddlewares()

        this.setRoutes();

        this.listen(port);
    }

    setMiddlewares() {
        this.app.use(bodyParser.urlencoded({ extended: false }))
        this.app.use(bodyParser.json())
        this.app.use(cors({origin: '*'}))
    }

    setRoutes() {
        this.app.use(e.static('public'));
        this.app.use('/api/users', usersRouter);
        this.app.use('/api/session', sessionRouter)
        this.app.use('/api/products', productsRouter);
    }

    listen(port) {
        this.app.listen(port, () => {
            console.log(`ouvindo na porta ${port}`);
        })
    }
}