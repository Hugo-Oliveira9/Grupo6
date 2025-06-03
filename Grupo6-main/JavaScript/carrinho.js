document.addEventListener('DOMContentLoaded', () => {
  const listaCarrinho = document.getElementById('lista-carrinho');
  const carrinhoVazio = document.getElementById('carrinho-vazio');
  const btnLimpar = document.getElementById('limpar-carrinho');

  let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];

  function atualizarCarrinho() {
    listaCarrinho.innerHTML = '';
    let total = 0;

    if (carrinho.length === 0) {
      carrinhoVazio.classList.remove('d-none');
      return;
    }

    carrinhoVazio.classList.add('d-none');

    carrinho.forEach((item, index) => {
      const li = document.createElement('li');
      li.className = 'list-group-item d-flex justify-content-between align-items-center';

      const nome = item.nome || 'Produto sem nome';
      const valor = item.valor || 0;
      total += valor;

      li.innerHTML = `
        <div>
          <strong>${nome}</strong><br>
          <small>R$ ${valor.toFixed(2)}</small>
        </div>
      `;

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

    // Adiciona o total no final da lista
    const liTotal = document.createElement('li');
    liTotal.className = 'list-group-item d-flex justify-content-between align-items-center font-weight-bold bg-light';
    liTotal.innerHTML = `
      <span>Total</span>
      <span>R$ ${total.toFixed(2)}</span>
    `;
    listaCarrinho.appendChild(liTotal);
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
