document.getElementById('cadastroForm').addEventListener('submit', function (event) {
    event.preventDefault();
    const nome = document.getElementById('nome').value;
    const senha = document.getElementById('senha').value;
    cadastrarUsuario(nome, senha);
});

async function cadastrarUsuario(nome, senha) {
    try {
        const response = await fetch('http://localhost:8080/alunos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ nome, senha })
        });

        if (response.ok) {
            alert('Usuário cadastrado com sucesso!');
            document.getElementById('cadastroForm').reset();
            listarUsuarios();
        } else {
            const error = await response.json();
            console.error('Erro ao cadastrar usuário: ', error);
            alert(`Erro ao cadastrar usuário: ${error.error || 'Tente novamente.'}`);
        }
    } catch (error) {
        console.error('Erro ao cadastrar usuário: ', error);
        alert('Erro ao cadastrar usuário. Verifique sua conexão e tente novamente.');
    }
}

async function listarUsuarios() {
    const listaUsuarios = document.getElementById('listaUsuarios');
    listaUsuarios.innerHTML = '';

    try {
        const response = await fetch('http://localhost:8080/alunos');

        if (!response.ok) {
            throw new Error(`Erro ao buscar usuários: ${response.status} ${response.statusText}`);
        }

        const alunos = await response.json();

        alunos.forEach((aluno) => {
            const alunoElement = document.createElement('li');
            alunoElement.textContent = `Nome: ${aluno.nome} Senha: ${aluno.senha}`;
            listaUsuarios.appendChild(alunoElement);
        });
    } catch (error) {
        console.error('Erro ao listar usuários: ', error);
        alert('Erro ao listar usuários. Tente novamente mais tarde.');
    }
}

window.onload = listarUsuarios;
