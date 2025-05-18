// carrinho.js

document.addEventListener('DOMContentLoaded', () => {
  const listaCarrinho = document.getElementById('lista-carrinho');
  const carrinhoVazio = document.getElementById('carrinho-vazio');
  const btnLimpar = document.getElementById('limpar-carrinho');

  let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];

  function atualizarCarrinho() {
    listaCarrinho.innerHTML = '';
    if (carrinho.length === 0) {
      carrinhoVazio.classList.remove('d-none');
      return;
    }

    carrinhoVazio.classList.add('d-none');

    carrinho.forEach((item, index) => {
      const li = document.createElement('li');
      li.className = 'list-group-item d-flex justify-content-between align-items-center';
      li.textContent = item.nome;

      const btnRemover = document.createElement('button');
      btnRemover.className = 'btn btn-sm btn-outline-danger';
      btnRemover.textContent = 'Remover';
      btnRemover.onclick = () => {
        carrinho.splice(index, 1);
        localStorage.setItem('carrinho', JSON.stringify(carrinho));
        atualizarCarrinho();
      };

      li.appendChild(btnRemover);
      listaCarrinho.appendChild(li);
    });
  }

  btnLimpar.addEventListener('click', () => {
    if (confirm('Deseja realmente limpar o carrinho?')) {
      carrinho = [];
      localStorage.removeItem('carrinho');
      atualizarCarrinho();
    }
  });

  atualizarCarrinho();
});
