import { addDoc, collection } from 'firebase/firestore';
import { Logger } from '../utils/logger.js';

class PostAlunosRoute {
    /**
     * @param {import('firebase/firestore').Firestore} db
     */
    constructor(db) {
        this.db = db;
    }

    /**
     * @param {import('express').Request} req
     * @param {import('express').Response} res
     */
    run = async (req, res) => {
        const { nome, senha } = req.body;

        if (!nome || !senha) {
            return res.status(400).json({ error: 'Valores inválidos, preencha todos os campos.' });
        }

        try {
            const docRef = await addDoc(collection(this.db, 'alunos'), {
                nome,
                senha
            });

            Logger.info(`Aluno adicionado com sucesso. ID: ${docRef.id}`);
            return res.status(201).json({ message: 'Aluno adicionado com sucesso.', id: docRef.id });
        } catch (error) {
            Logger.error('Erro ao adicionar aluno:', error);
            return res.status(500).json({ error: 'Erro ao adicionar aluno. Tente novamente mais tarde.' });
        }
    }
}

export { PostAlunosRoute };