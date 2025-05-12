const usuariosPadrao = [
    {email: "usuario1@teste.com", senha: "1234"},
    {email: "usuario2@teste.com", senha: "4321"}
];

function adicionarUser() {
    usuariosPadrao.forEach(user => {
        if (!localStorage.getItem(user.email)) {
            localStorage.setItem(user.email, JSON.stringify({senha: user.senha}));
        }
    });
}

function login(event) {
    event.preventDefault(); // Previne o comportamento de envio do formulário

    const email = document.querySelector("#exampleInputEmail1").value
    const senha = document.querySelector("#exampleInputPassword1").value

    const usuarioSalvo = localStorage.getItem(email)

    if (!usuarioSalvo) {
        alert("[ERRO] Usuário não encontrado.")
        return false
    }

    const dados = JSON.parse(usuarioSalvo)

    if (dados.senha === senha) 
    {
        localStorage.setItem("usuarioLogado",email)
        
        alert("Login realizado com sucesso!")
        window.location.href = "loja.html"
        return true
    } else {
        alert("[ERRO] Email ou Senha incorretos!.")
        return false;
    }
}

function cadastrar() 
{
    alert("Função de cadastro ainda não implementada.");
}

function logout()
{
    localStorage.removeItem("usuarioLogado")
    alert("Logout realizado com sucesso!")
    window.location.href = "index.html"
}

// Chama a função para garantir que os usuários padrão sejam adicionados ao localStorage
adicionarUser();
