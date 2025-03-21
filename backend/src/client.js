import { FirebaseService } from './database/firebaseService.js';
import { Server } from './server.js';

class Client {
    constructor() {
        this.firebase = new FirebaseService();
    }

    async start() {
        this.firebase.initializeFirebase();
        this.server = new Server(this.firebase.db);
        this.server.start();
    }
}

export { Client };