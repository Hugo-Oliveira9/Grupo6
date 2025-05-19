function adicionar(produto) {
  let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
  carrinho.push(produto);
  localStorage.setItem('carrinho', JSON.stringify(carrinho));
  alert(`${produto.nome} R$ ${produto.valor} reais foi adicionado ao carrinho!`);
}
