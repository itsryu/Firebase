import { getApps, initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { Logger } from '../utils/logger.js';

class FirebaseService {
    constructor() {
        this.app = null;
        this.db = null;
        this.initializeFirebase();
    }

    initializeFirebase() {
        try {
            if (!getApps().length) {
                this.app = initializeApp({
                    apiKey: process.env.API_KEY,
                    authDomain: process.env.AUTH_DOMAIN,
                    projectId: process.env.PROJECT_ID,
                    storageBucket: process.env.STORAGE_BUCKET,
                    messagingSenderId: process.env.MESSAGING_SENDER_ID,
                    appId: process.env.APP_ID,
                    measurementId: process.env.MEASUREMENT_ID
                });
                Logger.info('Firebase app inicializado com sucesso.');
            } else {
                this.app = getApps()[0];
                Logger.warn('Firebase app já havia sido inicializado.');
            }

            this.db = getFirestore(this.app);
            Logger.info('Conexão com Firestore estabelecida com sucesso.');
        } catch (err) {
            Logger.error('Erro ao conectar ao Firebase', err);
            throw err;
        }
    }

    getApp() {
        return this.app;
    }

    getDb() {
        return this.db;
    }
}

export { FirebaseService };