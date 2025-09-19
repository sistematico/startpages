const currentTheme = localStorage.getItem('theme');
const logo = document.querySelector("#logo");
const icon = document.querySelector("#theme-icon");
let theme = 'light';

function switchTheme() {
    if (theme === 'light') {
        theme = 'dark';
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');

        logo.classList.add("invert");
        icon.src = "assets/img/sun.svg";
     } else {
        theme = 'light';
        document.documentElement.setAttribute('data-theme', 'light');
        localStorage.setItem('theme', 'light');
        logo.classList.remove("invert");
        icon.src = "assets/img/moon.svg";
     }    
}

// Função para resetar todas as preferências
function resetAllPreferences() {
    if (confirm('Tem certeza que deseja limpar todas as preferências?\n\nIsso irá:\n- Remover todos os links personalizados\n- Resetar o tema para claro\n- Limpar todas as configurações salvas')) {
        // Limpar localStorage
        localStorage.removeItem('gaeguBookmarks');
        localStorage.removeItem('theme');
        
        // Resetar tema para claro
        theme = 'light';
        document.documentElement.setAttribute('data-theme', 'light');
        logo.classList.remove("invert");
        icon.src = "assets/img/moon.svg";
        
        // Recarregar links padrão
        if (typeof renderLinks === 'function') {
            renderLinks();
        }
        
        alert('Todas as preferências foram limpa com sucesso!');
    }
}

// Inicializar tema
if (currentTheme) {
    document.documentElement.setAttribute('data-theme', currentTheme);
  
    if (currentTheme === 'dark') {
        theme = 'dark';
        logo.classList.add("invert");
        icon.src = "assets/img/sun.svg";
    }
}

// Event listeners
icon.addEventListener('click', switchTheme, false);

// Adicionar event listener para o botão de reset quando o DOM carregar
document.addEventListener('DOMContentLoaded', function() {
    const resetButton = document.getElementById('reset-button');
    if (resetButton) {
        resetButton.addEventListener('click', resetAllPreferences);
    }
});