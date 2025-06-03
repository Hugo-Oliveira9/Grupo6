window.onload = function () {
    // Recupera o email do usuário logado
    const emailLogado = localStorage.getItem("usuarioLogado");
  
    // Se não houver um email logado, redireciona para a página de login
    if (!emailLogado) {
      alert("Você precisa estar logado para acessar esta página.");
      window.location.href = "index.html";
      return;
    }
  
    // Recupera o usuário usando o email logado como chave
    const usuarioJSON = localStorage.getItem(emailLogado);
    if (!usuarioJSON) {
      alert("Usuário não encontrado no sistema.");
      window.location.href = "index.html";
      return;
    }
  
    // Converte o JSON do usuário para um objeto JavaScript
    const usuario = JSON.parse(usuarioJSON);
    console.log("Usuário autenticado:", usuario);
  
    // Verifica se o nome do usuário está presente e exibe na tela
    if (usuario && usuario.nome) {
      const titulo = document.getElementById("boasVindas");
      console.log("Nome do usuário:", usuario.nome);
      if (titulo) {
        titulo.innerText = `Bem-vindo, ${usuario.nome}!`;
      } else {
        console.error("Elemento 'boasVindas' não encontrado.");
      }
    } else {
      console.error("O nome do usuário não foi encontrado no objeto.");
    }
  };
  