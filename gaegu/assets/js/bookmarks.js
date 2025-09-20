// Sistema de bookmarks para a página Gaegu
// Adaptado do sistema Nexus

// Variável global para armazenar os links
let defaultLinks = {};

// Carregar links do arquivo JSON
async function loadDefaultLinks() {
  try {
    const response = await fetch('assets/json/links.json');
    if (!response.ok) {
      throw new Error('Não foi possível carregar os links padrão.');
    }
    return await response.json();
  } catch (error) {
    try {
      const response = await fetch('json/links.json');
      if (!response.ok) {
        throw new Error('Não foi possível carregar os links padrão.');
      }
      return await response.json();
    } catch (error) {
      console.error('Erro ao carregar links padrão:', error);
      // Fallback para links básicos caso o arquivo JSON não seja encontrado
      return {
        "Local": [
          { name: "3000", url: "http://localhost:3000" },
          { name: "5173", url: "http://localhost:5173" },
          { name: "4321", url: "http://localhost:4321" },
          { name: "80", url: "http://localhost" },
          { name: "443", url: "https://localhost" }
        ],
        "Sites": [
          { name: "lucasbrum", url: "https://lucasbrum.dev" },
          { name: "agrocomm", url: "https://agrocomm.com.br" },
          { name: "somdomato", url: "https://somdomato.com" }
        ],
        "Desenvolvimento": [
          { name: "GitHub", url: "https://github.com" },
          { name: "GitLab", url: "https://gitlab.com" },
          { name: "CodePen", url: "https://codepen.io" },
          { name: "JSFiddle", url: "https://jsfiddle.net" }
        ],
        "Social": [
          { name: "Twitter", url: "https://twitter.com" },
          { name: "Instagram", url: "https://instagram.com" },
          { name: "LinkedIn", url: "https://linkedin.com" },
          { name: "Reddit", url: "https://reddit.com" }
        ]
      };
    }
  }
}

// Carregar links do localStorage ou usar os padrões
function loadLinks() {
  const savedLinks = localStorage.getItem('gaeguBookmarks');
  return savedLinks ? JSON.parse(savedLinks) : defaultLinks;
}

// Salvar links no localStorage
function saveLinks(links) {
  localStorage.setItem('gaeguBookmarks', JSON.stringify(links));
}

// Renderizar os links na página
function renderLinks() {
  const links = loadLinks();
  const container = document.getElementById('links-container');

  // Limpar container e remover indicador de carregamento
  container.innerHTML = '';

  for (const [category, items] of Object.entries(links)) {
    const categoryElement = document.createElement('div');
    categoryElement.className = 'cat link-category';
    categoryElement.dataset.category = category;

    const ul = document.createElement('ul');

    // Título da categoria
    const titleLi = document.createElement('li');
    titleLi.className = 'title';
    titleLi.textContent = category.toLowerCase();
    ul.appendChild(titleLi);

    // Container para os links
    const linksContainer = document.createElement('div');
    linksContainer.className = 'links-container';

    const grid = document.createElement('div');
    grid.className = 'links-grid';
    grid.dataset.currentPage = '1';

    // Calcular número de páginas (máximo 6 links por página para manter o layout do Gaegu)
    const itemsPerPage = 6;
    const totalPages = Math.ceil(items.length / itemsPerPage);

    // Adicionar links da primeira página
    const currentPage = 1;
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const pageItems = items.slice(startIndex, endIndex);

    pageItems.forEach(item => {
      const li = document.createElement('li');
      const link = document.createElement('a');
      link.href = item.url;
      link.target = item.target || '_blank';
      if (link.target === '_blank') {
        link.rel = 'noopener noreferrer';
      }
      link.className = 'link-item effect';
      link.textContent = item.name;

      li.appendChild(link);
      grid.appendChild(li);
    });

    linksContainer.appendChild(grid);

    // Adicionar paginação se houver mais de uma página
    if (totalPages > 1) {
      const pagination = document.createElement('div');
      pagination.className = 'pagination';

      const prevButton = document.createElement('button');
      prevButton.className = 'pagination-btn';
      prevButton.innerHTML = '‹';
      prevButton.addEventListener('click', () => changePage(category, -1));

      const pageIndicator = document.createElement('span');
      pageIndicator.className = 'page-indicator';
      pageIndicator.textContent = `${currentPage}/${totalPages}`;

      const nextButton = document.createElement('button');
      nextButton.className = 'pagination-btn';
      nextButton.innerHTML = '›';
      nextButton.addEventListener('click', () => changePage(category, 1));

      pagination.appendChild(prevButton);
      pagination.appendChild(pageIndicator);
      pagination.appendChild(nextButton);

      linksContainer.appendChild(pagination);
    }

    ul.appendChild(linksContainer);
    categoryElement.appendChild(ul);
    container.appendChild(categoryElement);
  }
}

// Mudar página de uma categoria
function changePage(category, direction) {
  const categoryElement = document.querySelector(`.link-category[data-category="${category}"]`);
  const grid = categoryElement.querySelector('.links-grid');
  const pagination = categoryElement.querySelector('.pagination');
  const pageIndicator = categoryElement.querySelector('.page-indicator');

  const items = loadLinks()[category];
  const itemsPerPage = 6;
  const totalPages = Math.ceil(items.length / itemsPerPage);

  let currentPage = parseInt(grid.dataset.currentPage);
  currentPage += direction;

  // Verificar limites
  if (currentPage < 1) currentPage = 1;
  if (currentPage > totalPages) currentPage = totalPages;

  // Atualizar página atual
  grid.dataset.currentPage = currentPage;

  // Calcular índices dos itens a serem exibidos
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const pageItems = items.slice(startIndex, endIndex);

  // Atualizar grid
  grid.innerHTML = '';
  pageItems.forEach(item => {
    const li = document.createElement('li');
    const link = document.createElement('a');
    link.href = item.url;
    link.target = item.target || '_blank';
    if (link.target === '_blank') {
      link.rel = 'noopener noreferrer';
    }
    link.className = 'link-item effect';
    link.textContent = item.name;

    li.appendChild(link);
    grid.appendChild(li);
  });

  // Atualizar indicador de página
  pageIndicator.textContent = `${currentPage}/${totalPages}`;

  // Atualizar estado dos botões
  const prevButton = pagination.querySelector('.pagination-btn:first-child');
  const nextButton = pagination.querySelector('.pagination-btn:last-child');

  prevButton.classList.toggle('disabled', currentPage === 1);
  nextButton.classList.toggle('disabled', currentPage === totalPages);
}

// Renderizar o formulário de edição
function renderEditForm() {
  const links = loadLinks();
  const form = document.getElementById('edit-form');
  form.innerHTML = '';

  // Adicionar seção de configurações globais
  const globalSettings = document.createElement('div');
  globalSettings.className = 'global-settings';

  const settingsTitle = document.createElement('h3');
  settingsTitle.textContent = 'Configurações Globais';
  globalSettings.appendChild(settingsTitle);

  const settingsRow = document.createElement('div');
  settingsRow.className = 'settings-row';

  // Toggle para nova aba
  const toggleContainer = document.createElement('div');
  toggleContainer.className = 'toggle-container';

  const toggleLabel = document.createElement('span');
  toggleLabel.className = 'toggle-label';
  toggleLabel.textContent = 'Abrir links em nova aba';

  const toggle = document.createElement('div');
  toggle.className = 'toggle active';
  toggle.id = 'newTabToggle';

  const toggleSlider = document.createElement('div');
  toggleSlider.className = 'toggle-slider';
  toggle.appendChild(toggleSlider);

  // Carregar configuração salva
  const openInNewTab = localStorage.getItem('gaeguOpenInNewTab') !== 'false';
  if (!openInNewTab) {
    toggle.classList.remove('active');
  }

  toggle.addEventListener('click', function () {
    this.classList.toggle('active');
    const isActive = this.classList.contains('active');
    localStorage.setItem('gaeguOpenInNewTab', isActive);
  });

  toggleContainer.appendChild(toggleLabel);
  toggleContainer.appendChild(toggle);
  settingsRow.appendChild(toggleContainer);
  globalSettings.appendChild(settingsRow);
  form.appendChild(globalSettings);

  for (const [category, items] of Object.entries(links)) {
    const categoryDiv = document.createElement('div');
    categoryDiv.className = 'category';

    const header = document.createElement('div');
    header.className = 'category-header';

    const title = document.createElement('h3');
    title.textContent = category;
    title.className = 'category-title';
    header.appendChild(title);

    const removeBtn = document.createElement('button');
    removeBtn.innerHTML = '🗑️';
    removeBtn.className = 'action-btn';
    removeBtn.title = 'Remover Categoria';
    removeBtn.onclick = () => removeCategory(category);
    header.appendChild(removeBtn);

    categoryDiv.appendChild(header);

    items.forEach((item, index) => {
      const itemDiv = document.createElement('div');
      itemDiv.className = 'link-editor';

      const nameInput = document.createElement('input');
      nameInput.type = 'text';
      nameInput.placeholder = 'Nome do link';
      nameInput.value = item.name;
      nameInput.dataset.category = category;
      nameInput.dataset.index = index;
      nameInput.dataset.field = 'name';

      const urlInput = document.createElement('input');
      urlInput.type = 'text';
      urlInput.placeholder = 'URL do site (https://...)';
      urlInput.value = item.url;
      urlInput.dataset.category = category;
      urlInput.dataset.index = index;
      urlInput.dataset.field = 'url';

      // Toggle individual para nova aba
      const linkToggle = document.createElement('div');
      linkToggle.className = 'toggle';
      linkToggle.title = 'Abrir em nova aba';
      if (item.target !== '_self') {
        linkToggle.classList.add('active');
      }

      const linkToggleSlider = document.createElement('div');
      linkToggleSlider.className = 'toggle-slider';
      linkToggle.appendChild(linkToggleSlider);

      linkToggle.addEventListener('click', function () {
        this.classList.toggle('active');
      });

      const removeLinkBtn = document.createElement('button');
      removeLinkBtn.innerHTML = '🗑️';
      removeLinkBtn.className = 'action-btn';
      removeLinkBtn.title = 'Remover Link';
      removeLinkBtn.onclick = () => removeLink(category, index);

      itemDiv.appendChild(nameInput);
      itemDiv.appendChild(urlInput);
      itemDiv.appendChild(linkToggle);
      itemDiv.appendChild(removeLinkBtn);

      categoryDiv.appendChild(itemDiv);
    });

    const addLinkBtn = document.createElement('button');
    addLinkBtn.textContent = 'Adicionar Link';
    addLinkBtn.className = 'add-btn';
    addLinkBtn.onclick = () => addNewLink(category);
    categoryDiv.appendChild(addLinkBtn);

    form.appendChild(categoryDiv);
  }

  const addCategoryBtn = document.createElement('button');
  addCategoryBtn.textContent = 'Adicionar Nova Categoria';
  addCategoryBtn.className = 'add-btn';
  addCategoryBtn.onclick = addNewCategory;
  addCategoryBtn.style.marginTop = '20px';
  form.appendChild(addCategoryBtn);
}

// Adicionar novo link a uma categoria
function addNewLink(category) {
  const links = loadLinks();
  const openInNewTab = localStorage.getItem('gaeguOpenInNewTab') !== 'false';
  links[category].push({
    name: 'Novo Link',
    url: 'https://',
    target: openInNewTab ? '_blank' : '_self'
  });
  saveLinks(links);
  renderEditForm();
}

// Remover link de uma categoria
function removeLink(category, index) {
  const links = loadLinks();
  links[category].splice(index, 1);

  // Se não houver mais links na categoria, remover a categoria também
  if (links[category].length === 0) {
    delete links[category];
  }

  saveLinks(links);
  renderEditForm();
}

// Adicionar nova categoria
function addNewCategory() {
  const categoryName = prompt('Nome da nova categoria:');
  if (categoryName && categoryName.trim() !== '') {
    const links = loadLinks();
    links[categoryName] = [];
    saveLinks(links);
    renderEditForm();
  }
}

// Remover categoria
function removeCategory(category) {
  if (confirm(`Tem certeza que deseja remover a categoria "${category}" e todos os seus links?`)) {
    const links = loadLinks();
    delete links[category];
    saveLinks(links);
    renderEditForm();
  }
}

// Salvar alterações do formulário
function saveChanges() {
  const inputs = document.querySelectorAll('#edit-form input');
  const toggles = document.querySelectorAll('#edit-form .link-editor .toggle');
  const links = loadLinks();

  inputs.forEach(input => {
    const category = input.dataset.category;
    const index = parseInt(input.dataset.index);
    const field = input.dataset.field;

    if (links[category] && links[category][index]) {
      links[category][index][field] = input.value;
    }
  });

  // Salvar configurações de target para cada link
  toggles.forEach((toggle, toggleIndex) => {
    const linkEditor = toggle.closest('.link-editor');
    const nameInput = linkEditor.querySelector('input[data-field="name"]');
    if (nameInput) {
      const category = nameInput.dataset.category;
      const index = parseInt(nameInput.dataset.index);

      if (links[category] && links[category][index]) {
        links[category][index].target = toggle.classList.contains('active') ? '_blank' : '_self';
      }
    }
  });

  saveLinks(links);
  renderLinks();
  closeModal();
}

// Abrir modal de edição
function openModal() {
  renderEditForm();
  document.getElementById('edit-modal').style.display = 'flex';
}

// Fechar modal de edição
function closeModal() {
  document.getElementById('edit-modal').style.display = 'none';
}

// Inicializar o sistema de bookmarks
async function initBookmarks() {
  // Carregar links padrão do arquivo JSON
  defaultLinks = await loadDefaultLinks();

  // Renderizar links após carregamento
  renderLinks();

  // Event listeners
  document.getElementById('edit-button').addEventListener('click', openModal);
  document.getElementById('close-modal').addEventListener('click', closeModal);
  document.getElementById('cancel-button').addEventListener('click', closeModal);
  document.getElementById('save-button').addEventListener('click', saveChanges);

  // Fechar modal clicando fora dele
  document.getElementById('edit-modal').addEventListener('click', (e) => {
    if (e.target === document.getElementById('edit-modal')) {
      closeModal();
    }
  });
}

// Iniciar quando o documento estiver carregado
document.addEventListener('DOMContentLoaded', initBookmarks);