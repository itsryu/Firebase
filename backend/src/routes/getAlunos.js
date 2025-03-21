import { collection, getDocs } from 'firebase/firestore';

class GetAlunosRoute {
    /**
     * @param {import('firebase/firestore').Firestore} db
     */
    constructor(db) {
        this.db = db;
    }

    /**
     * @param {import('express').Request} _ 
     * @param {import('express').Response} res
     */
    run = async (_, res) => {
        try {
            const alunos = await this.getAlunos();

            res.status(200).json(alunos.map((aluno) => aluno.data()));
        } catch (error) {
            console.error('Error fetching alunos:', error);
            res.status(500).json({ error: 'Failed to fetch alunos' });
        }
    }

    getAlunos = async () => {
        const querySnapshot = await getDocs(collection(this.db, 'alunos'));
        const alunos = [];

        querySnapshot.forEach((doc) => alunos.push(doc));

        return alunos;
    };
}

export { GetAlunosRoute };