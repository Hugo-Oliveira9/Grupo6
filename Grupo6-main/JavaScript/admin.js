document.addEventListener('DOMContentLoaded', function () {
  const userForm = document.getElementById('userForm');
  const userList = document.getElementById('userTableBody'); // Corrigido aqui
  let users = JSON.parse(localStorage.getItem('users')) || [];

  function saveUsers() {
    localStorage.setItem('users', JSON.stringify(users));
  }

  function getNextId() {
    return users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1;
  }

  function renderUsers() {
    userList.innerHTML = '';
    users.forEach(user => {
      const tr = document.createElement('tr');
      const actionButton = user.role === "admin"
        ? `<button class="btn btn-warning btn-sm toggle-role" data-id="${user.id}">Rebaixar</button>`
        : `<button class="btn btn-success btn-sm toggle-role" data-id="${user.id}">Promover</button>`;

      tr.innerHTML = `
        <td>${user.id}</td>
        <td>${user.name}</td>
        <td>${user.role}</td>
        <td>
          ${actionButton}
          <button class="btn btn-danger btn-sm delete" data-id="${user.id}">Excluir</button>
        </td>
      `;
      userList.appendChild(tr);
    });
  }

  userForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const username = document.getElementById('username').value.trim();
    const role = document.getElementById('role').value;

    if (username === '') return;

    const email = prompt("Digite o email do usuário:");
    const senha = prompt("Digite a senha do usuário:");

    if (!email || !senha) {
      alert("Email e senha são obrigatórios!");
      return;
    }

    const newUser = {
      id: getNextId(),
      name: username,
      role: role,
      email: email,
      senha: senha,
      cidade: "",
      estado: "",
      cep: ""
    };

    users.push(newUser);
    saveUsers();

    // Grava também para a lógica de login funcionar
    localStorage.setItem(email, JSON.stringify({
      nome: username,
      senha: senha,
      cidade: "",
      estado: "",
      cep: "",
      permissao: role
    }));

    renderUsers();
    this.reset();
  });

  userList.addEventListener('click', function (e) {
    const id = parseInt(e.target.getAttribute('data-id'));
    if (e.target.classList.contains('delete')) {
      users = users.filter(user => user.id !== id);
      saveUsers();
      renderUsers();
    }

    if (e.target.classList.contains('toggle-role')) {
      users = users.map(user => {
        if (user.id === id) {
          user.role = user.role === 'admin' ? 'user' : 'admin';

          // Atualiza também o localStorage individual usado no login
          const dadosLogin = JSON.parse(localStorage.getItem(user.email));
          if (dadosLogin) {
            dadosLogin.permissao = user.role;
            localStorage.setItem(user.email, JSON.stringify(dadosLogin));
          }
        }
        return user;
      });

      saveUsers();
      renderUsers();
    }
  });

  renderUsers();
});
// Função para buscar usuários por nome
function searchUsers() {
  const searchInput = document.getElementById('searchInput').value.trim().toLowerCase();
  const userList = document.getElementById('userTableBody');
  userList.innerHTML = '';

  const users = JSON.parse(localStorage.getItem('users')) || [];
  const filteredUsers = users.filter(user => user.name.toLowerCase().includes(searchInput));

  filteredUsers.forEach(user => {
    const tr = document.createElement('tr');
    const actionButton = user.role === "admin"
      ? `<button class="btn btn-warning btn-sm toggle-role" data-id="${user.id}">Rebaixar</button>`
      : `<button class="btn btn-success btn-sm toggle-role" data-id="${user.id}">Promover</button>`;

    tr.innerHTML = `
      <td>${user.id}</td>
      <td>${user.name}</td>
      <td>${user.role}</td>
      <td>
        ${actionButton}
        <button class="btn btn-danger btn-sm delete" data-id="${user.id}">Excluir</button>
      </td>
    `;
    userList.appendChild(tr);
  });
}

// Função para limpar a busca e mostrar todos os usuários
function resetSearch() {
  document.getElementById('searchInput').value = '';
  const users = JSON.parse(localStorage.getItem('users')) || [];

  const userList = document.getElementById('userTableBody');
  userList.innerHTML = '';
  users.forEach(user => {
    const tr = document.createElement('tr');
    const actionButton = user.role === "admin"
      ? `<button class="btn btn-warning btn-sm toggle-role" data-id="${user.id}">Rebaixar</button>`
      : `<button class="btn btn-success btn-sm toggle-role" data-id="${user.id}">Promover</button>`;

    tr.innerHTML = `
      <td>${user.id}</td>
      <td>${user.name}</td>
      <td>${user.role}</td>
      <td>
        ${actionButton}
        <button class="btn btn-danger btn-sm delete" data-id="${user.id}">Excluir</button>
      </td>
    `;
    userList.appendChild(tr);
  });
}
