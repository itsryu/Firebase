import express, { Router } from 'express';
import cors from 'cors';
import { GetAlunosRoute, HomeRoute, PostAlunosRoute } from './routes/index.js';
import { Logger } from './utils/logger.js';

class Server {
    /**
    * @param {import('firebase/firestore').Firestore} db
    */
    constructor(db) {
        this.app = express();
        this.db = db
        this.config();
    }

    config() {
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
        this.app.use(this.initRoutes());
    }

    initRoutes() {
        const router = Router();
        const routes = this.loadRoutes();

        routes.forEach(route => {
            const { method, path, handler } = route;

            router[method.toLowerCase()](path, handler.run);
        });

        Logger.info('Rotas carregadas com sucesso.');

        return router;
    }

    loadRoutes() {
        const routes = [
            { method: 'GET', path: '/', handler: new HomeRoute() },
            { method: 'GET', path: '/alunos', handler: new GetAlunosRoute(this.db) },
            { method: 'POST', path: '/alunos', handler: new PostAlunosRoute(this.db) }
        ]

        return routes;
    }

    start() {
        this.app.listen(process.env.PORT, () => {
            Logger.debug(`Servidor rodando em http://localhost:${process.env.PORT}`);
        });
    }
}

export { Server };