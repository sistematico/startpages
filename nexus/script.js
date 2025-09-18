// Variável global para armazenar os links
let defaultLinks = {};

// Carregar links do arquivo JSON
async function loadDefaultLinks() {
    try {
        const response = await fetch('links.json');
        if (!response.ok) {
            throw new Error('Não foi possível carregar os links padrão.');
        }
        return await response.json();
    } catch (error) {
        console.error('Erro ao carregar links padrão:', error);
        // Fallback para links básicos caso o arquivo JSON não seja encontrado
        return {
            "Trabalho": [
                { name: "GitHub", url: "https://github.com", icon: "fab fa-github" },
                { name: "Stack Overflow", url: "https://stackoverflow.com", icon: "fab fa-stack-overflow" }
            ],
            "Entretenimento": [
                { name: "YouTube", url: "https://youtube.com", icon: "fab fa-youtube" },
                { name: "Netflix", url: "https://netflix.com", icon: "fab fa-netflix" }
            ],
            "Social": [
                { name: "Twitter", url: "https://twitter.com", icon: "fab fa-twitter" },
                { name: "Instagram", url: "https://instagram.com", icon: "fab fa-instagram" }
            ]
        };
    }
}

// Atualizar a data
function updateDate() {
    const now = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = now.toLocaleDateString('pt-BR', options);
    document.getElementById('current-date').textContent = formattedDate;
}

// Carregar links do localStorage ou usar os padrões
function loadLinks() {
    const savedLinks = localStorage.getItem('nexusHomeLinks');
    return savedLinks ? JSON.parse(savedLinks) : defaultLinks;
}

// Salvar links no localStorage
function saveLinks(links) {
    localStorage.setItem('nexusHomeLinks', JSON.stringify(links));
}

// Renderizar os links na página com paginação
function renderLinks() {
    const links = loadLinks();
    const container = document.getElementById('links-container');
    
    // Limpar container e remover indicador de carregamento
    container.innerHTML = '';
    
    for (const [category, items] of Object.entries(links)) {
        const categoryElement = document.createElement('div');
        categoryElement.className = 'link-category';
        categoryElement.dataset.category = category;
        
        const title = document.createElement('h2');
        title.innerHTML = `<i class="fas fa-folder"></i> ${category}`;
        categoryElement.appendChild(title);
        
        const linksContainer = document.createElement('div');
        linksContainer.className = 'links-container';
        
        const grid = document.createElement('div');
        grid.className = 'links-grid';
        grid.dataset.currentPage = '1';
        
        // Calcular número de páginas
        const itemsPerPage = 4;
        const totalPages = Math.ceil(items.length / itemsPerPage);
        
        // Adicionar links da primeira página
        const currentPage = 1;
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        const pageItems = items.slice(startIndex, endIndex);
        
        pageItems.forEach(item => {
            const link = document.createElement('a');
            link.href = item.url;
            link.target = '_blank';
            link.rel = 'noopener noreferrer';
            link.className = 'link-item';
            
            const icon = document.createElement('i');
            icon.className = `link-icon ${item.icon}`;
            link.appendChild(icon);
            
            const text = document.createElement('span');
            text.textContent = item.name;
            link.appendChild(text);
            
            grid.appendChild(link);
        });
        
        linksContainer.appendChild(grid);
        
        // Adicionar paginação se houver mais de uma página
        if (totalPages > 1) {
            const pagination = document.createElement('div');
            pagination.className = 'pagination';
            
            const prevButton = document.createElement('button');
            prevButton.className = 'pagination-btn';
            prevButton.innerHTML = '<i class="fas fa-chevron-left"></i>';
            prevButton.addEventListener('click', () => changePage(category, -1));
            
            const pageIndicator = document.createElement('span');
            pageIndicator.className = 'page-indicator';
            pageIndicator.textContent = `${currentPage}/${totalPages}`;
            
            const nextButton = document.createElement('button');
            nextButton.className = 'pagination-btn';
            nextButton.innerHTML = '<i class="fas fa-chevron-right"></i>';
            nextButton.addEventListener('click', () => changePage(category, 1));
            
            pagination.appendChild(prevButton);
            pagination.appendChild(pageIndicator);
            pagination.appendChild(nextButton);
            
            linksContainer.appendChild(pagination);
        }
        
        categoryElement.appendChild(linksContainer);
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
    const itemsPerPage = 4;
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
        const link = document.createElement('a');
        link.href = item.url;
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
        link.className = 'link-item';
        
        const icon = document.createElement('i');
        icon.className = `link-icon ${item.icon}`;
        link.appendChild(icon);
        
        const text = document.createElement('span');
        text.textContent = item.name;
        link.appendChild(text);
        
        grid.appendChild(link);
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
        removeBtn.textContent = 'Remover Categoria';
        removeBtn.className = 'action-btn';
        removeBtn.onclick = () => removeCategory(category);
        header.appendChild(removeBtn);
        
        categoryDiv.appendChild(header);
        
        items.forEach((item, index) => {
            const itemDiv = document.createElement('div');
            itemDiv.className = 'link-editor';
            
            const iconInput = document.createElement('input');
            iconInput.type = 'text';
            iconInput.placeholder = 'Ícone (ex: fab fa-github)';
            iconInput.value = item.icon || '';
            iconInput.dataset.category = category;
            iconInput.dataset.index = index;
            iconInput.dataset.field = 'icon';
            
            const nameInput = document.createElement('input');
            nameInput.type = 'text';
            nameInput.placeholder = 'Nome';
            nameInput.value = item.name;
            nameInput.dataset.category = category;
            nameInput.dataset.index = index;
            nameInput.dataset.field = 'name';
            
            const urlInput = document.createElement('input');
            urlInput.type = 'text';
            urlInput.placeholder = 'URL';
            urlInput.value = item.url;
            urlInput.dataset.category = category;
            urlInput.dataset.index = index;
            urlInput.dataset.field = 'url';
            
            const removeLinkBtn = document.createElement('button');
            removeLinkBtn.textContent = 'Remover';
            removeLinkBtn.className = 'action-btn';
            removeLinkBtn.onclick = () => removeLink(category, index);
            
            itemDiv.appendChild(iconInput);
            itemDiv.appendChild(nameInput);
            itemDiv.appendChild(urlInput);
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
    links[category].push({ name: 'Novo Link', url: 'https://', icon: 'fas fa-link' });
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
    const links = loadLinks();
    
    inputs.forEach(input => {
        const category = input.dataset.category;
        const index = parseInt(input.dataset.index);
        const field = input.dataset.field;
        
        if (links[category] && links[category][index]) {
            links[category][index][field] = input.value;
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

// Inicializar a página
async function init() {
    updateDate();
    
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
    
    // Atualizar a data a cada minuto
    setInterval(updateDate, 60000);
}

// Iniciar quando o documento estiver carregado
document.addEventListener('DOMContentLoaded', init);