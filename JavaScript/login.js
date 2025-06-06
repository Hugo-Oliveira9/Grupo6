const usuariosPadrao = [
    {email: "usuario1@teste.com", senha: "1234", nome: "Usuario1", cidade:"Diadema", estado: "São Paulo", cep:"12345-678", permissao: "user"},
    {email: "usuario2@teste.com", senha: "4321", nome: "Usuario2", cidade:"Diadema", estado: "São Paulo", cep:"87654-321", permissao: "user"}
];

// Salvar usuários padrão se ainda não existirem
usuariosPadrao.forEach(usuario => {
    if (!localStorage.getItem(usuario.email)) {
        localStorage.setItem(usuario.email, JSON.stringify(usuario));
    }
});

function login(event) {
    event.preventDefault(); // Previne o comportamento de envio do formulário

    const email = document.querySelector("#exampleInputEmail1").value;
    const senha = document.querySelector("#exampleInputPassword1").value;

    const usuarioSalvo = localStorage.getItem(email);

    if (!usuarioSalvo) {
        alert("[ERRO] Usuário não encontrado.");
        return false;
    }

    const dados = JSON.parse(usuarioSalvo);

    if (dados.senha === senha) {
        localStorage.setItem("usuarioLogado", email);
        alert("Login realizado com sucesso!");

        if (dados.permissao === "admin") {
            window.location.href = "admin.html";
        } else {
            window.location.href = "loja.html";
        }

        return true;
    } else {
        alert("[ERRO] Email ou Senha incorretos!");
        return false;
    }
}

function cadastrar() {
    const email = document.querySelector("#inputEmail").value.trim();
    const senha = document.querySelector("#inputSenha").value.trim();
    const nome = document.querySelector("#inputNome").value.trim();
    const cidade = document.querySelector("#inputCity").value.trim();
    const estado = document.querySelector("#inputEstado").value;
    const cep = document.querySelector("#inputCEP").value.trim();
    const termosAceitos = document.querySelector("#gridCheck").checked;
    const permissao = document.querySelector("#permissao").value; // admin ou user

    if (!email || !senha || !nome || !cidade || !estado || !cep) {
        alert("Preencha todos os campos!");
        return;
    }

    if (!termosAceitos) {
        alert("Você precisa aceitar os termos e condições.");
        return;
    }

    if (localStorage.getItem(email)) {
        alert("Este email já está cadastrado.");
        return;
    }

    const novoUsuario = {
        nome,
        senha,
        cidade,
        estado,
        cep,
        permissao
    };

    localStorage.setItem(email, JSON.stringify(novoUsuario));
    alert("Cadastro realizado com sucesso!");

    localStorage.setItem("usuarioLogado", email);
    window.location.href = "index.html";
}

function logout() {
    localStorage.removeItem("usuarioLogado");
    alert("Logout realizado com sucesso!");
    window.location.href = "index.html";
}
