document.addEventListener('DOMContentLoaded', function () {
  const userForm = document.getElementById('userForm');
  const userList = document.getElementById('userTableBody');
  let users = JSON.parse(localStorage.getItem('users')) || [];

  const adminEmail = 'admin@admin.com';
  const adminUser = users.find(u => u.email === adminEmail);
  if (!adminUser) {
    const novoAdmin = {
      id: 1,
      name: 'Administrador Padrão',
      role: 'admin',
      email: adminEmail,
      senha: 'admin123',
      cidade: '',
      estado: '',
      cep: ''
    }
  
    users.push(novoAdmin);
    localStorage.setItem('users', JSON.stringify(users));
    localStorage.setItem(adminEmail, JSON.stringify({
      nome: novoAdmin.name,
      senha: novoAdmin.senha,
      cidade: '',
      estado: '',
      cep: '',
      permissao: 'admin'
    }));
  }

  function saveUsers() {
    localStorage.setItem('users', JSON.stringify(users));
  }

  function getNextId() {
    return users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1;
  }

  function renderUsers() {
    userList.innerHTML = '';
    users.forEach(user => {
      const isDefaultAdmin = user.email === adminEmail;

      const actionButton = user.role === "admin"
        ? `<button class="btn btn-warning btn-sm toggle-role" data-id="${user.id}" ${isDefaultAdmin ? 'disabled' : ''}>Rebaixar</button>`
        : `<button class="btn btn-success btn-sm toggle-role" data-id="${user.id}">Promover</button>`;

      const editButton = `<button class="btn btn-info btn-sm edit" data-id="${user.id}">Atualizar</button>`;
      const deleteButton = `<button class="btn btn-danger btn-sm delete" data-id="${user.id}" ${isDefaultAdmin ? 'disabled' : ''}>Excluir</button>`;

      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>${user.id}</td>
        <td>${user.name}</td>
        <td>${user.role}</td>
        <td>
          ${actionButton}
          ${editButton}
          ${deleteButton}
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
    const user = users.find(u => u.id === id);
    if (!user) return;

    if (e.target.classList.contains('delete')) {
      if (user.email === adminEmail) {
        alert("Você não pode excluir o administrador padrão!");
        return;
      }
      if (confirm("Tem certeza que deseja excluir este usuário?")) {
    users = users.filter(u => u.id !== id);
    localStorage.removeItem(user.email);
    saveUsers();
    renderUsers();
      }

      users = users.filter(u => u.id !== id);
      localStorage.removeItem(user.email);
      saveUsers();
      renderUsers();
    }

    if (e.target.classList.contains('toggle-role')) {
      if (user.email === adminEmail) {
        alert("Você não pode alterar a permissão do administrador padrão!");
        return;
      }

      user.role = user.role === 'admin' ? 'user' : 'admin';

      const dadosLogin = JSON.parse(localStorage.getItem(user.email));
      if (dadosLogin) {
        dadosLogin.permissao = user.role;
        localStorage.setItem(user.email, JSON.stringify(dadosLogin));
      }

      saveUsers();
      renderUsers();
    }

    if (e.target.classList.contains('edit')) {
      const novoNome = prompt("Editar nome:", user.name);
      const novoEmail = prompt("Editar email:", user.email);
      const novaSenha = prompt("Editar senha:", user.senha);
      const novaCidade = prompt("Editar cidade:", user.cidade || "");
      const novoEstado = prompt("Editar estado:", user.estado || "");
      const novoCep = prompt("Editar CEP:", user.cep || "");

      if (novoNome && novoEmail && novaSenha) {
        
        if (user.email !== novoEmail) {
          localStorage.removeItem(user.email);
        }

        user.name = novoNome;
        user.email = novoEmail;
        user.senha = novaSenha;
        user.cidade = novaCidade;
        user.estado = novoEstado;
        user.cep = novoCep;

        localStorage.setItem(novoEmail, JSON.stringify({
          nome: novoNome,
          senha: novaSenha,
          cidade: novaCidade,
          estado: novoEstado,
          cep: novoCep,
          permissao: user.role
        }));

        saveUsers();
        renderUsers();
      } else {
        alert("Atualização cancelada ou campos inválidos.");
      }
    }
  });

  renderUsers();
});

// Buscar por nome
function searchUsers() {
  const searchInput = document.getElementById('searchInput').value.trim().toLowerCase();
  const userList = document.getElementById('userTableBody');
  userList.innerHTML = '';

  const users = JSON.parse(localStorage.getItem('users')) || [];
  const filteredUsers = users.filter(user => user.name.toLowerCase().includes(searchInput));

  filteredUsers.forEach(user => {
    const isDefaultAdmin = user.email === 'admin@admin.com';
    const actionButton = user.role === "admin"
      ? `<button class="btn btn-warning btn-sm toggle-role" data-id="${user.id}" ${isDefaultAdmin ? 'disabled' : ''}>Rebaixar</button>`
      : `<button class="btn btn-success btn-sm toggle-role" data-id="${user.id}">Promover</button>`;

    const editButton = `<button class="btn btn-info btn-sm edit" data-id="${user.id}">Atualizar</button>`;
    const deleteButton = `<button class="btn btn-danger btn-sm delete" data-id="${user.id}" ${isDefaultAdmin ? 'disabled' : ''}>Excluir</button>`;

    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${user.id}</td>
      <td>${user.name}</td>
      <td>${user.role}</td>
      <td>
        ${actionButton}
        ${editButton}
        ${deleteButton}
      </td>
    `;
    userList.appendChild(tr);
  });
}

// Limpar busca
function resetSearch() {
  document.getElementById('searchInput').value = '';
  const users = JSON.parse(localStorage.getItem('users')) || [];

  const userList = document.getElementById('userTableBody');
  userList.innerHTML = '';
  users.forEach(user => {
    const isDefaultAdmin = user.email === 'admin@admin.com';
    const actionButton = user.role === "admin"
      ? `<button class="btn btn-warning btn-sm toggle-role" data-id="${user.id}" ${isDefaultAdmin ? 'disabled' : ''}>Rebaixar</button>`
      : `<button class="btn btn-success btn-sm toggle-role" data-id="${user.id}">Promover</button>`;

    const editButton = `<button class="btn btn-info btn-sm edit" data-id="${user.id}">Atualizar</button>`;
    const deleteButton = `<button class="btn btn-danger btn-sm delete" data-id="${user.id}" ${isDefaultAdmin ? 'disabled' : ''}>Excluir</button>`;

    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${user.id}</td>
      <td>${user.name}</td>
      <td>${user.role}</td>
      <td>
        ${actionButton}
        ${editButton}
        ${deleteButton}
      </td>
    `;
    userList.appendChild(tr);
  });
}
