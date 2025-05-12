window.onload = function () {
    const emailLogado = localStorage.getItem("usuarioLogado");

    if (!emailLogado) {
        alert("Você precisa estar logado para acessar esta página.");
        window.location.href = "index.html";
        return;
    }

    const usuarioJSON = localStorage.getItem(emailLogado);
    if (!usuarioJSON) {
        alert("Usuário não encontrado no sistema.");
        window.location.href = "index.html";
        return;
    }

    const usuario = JSON.parse(usuarioJSON);

    // Preenche os campos do formulário
    document.getElementById("inputNome").value = usuario.nome || '';
    document.getElementById("inputSenha").value = usuario.senha || '';
    document.getElementById("inputEmail").value = emailLogado; // email é a chave, não precisa editar
    document.getElementById("user_time_zone").value = usuario.estado || '';
};

document.addEventListener("DOMContentLoaded", () => {
    const btnAtualizar = document.getElementById("btnPerfil");

    btnAtualizar.addEventListener("click", () => {
        const nome = document.getElementById("inputNome").value.trim();
        const senha = document.getElementById("inputSenha").value.trim();
        const estado = document.getElementById("user_time_zone").value;
        const email = localStorage.getItem("usuarioLogado");

        if (!nome) {
            alert("O nome não pode estar vazio.");
            return;
        }

        const usuarioAtualizado = {
            nome: nome,
            senha: senha || "1234", // se quiser exigir nova senha, pode validar aqui
            estado: estado
        };

        localStorage.setItem(email, JSON.stringify(usuarioAtualizado));
        alert("Dados atualizados com sucesso!");
        window.location.href = "loja.html";
    });
});
