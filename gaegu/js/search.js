const input = document.getElementById('search');
const searchform = document.getElementById('searchform');
const currentIndex = localStorage.getItem('index');
let index, provider;

if (currentIndex) {
    index = currentIndex;
} else {
    index = 0;
}

const providers = [
    {name: 'Google', url: 'https://www.google.com/search'},
    {name: 'DuckDuckGo', url: 'https://duckduckgo.com/'},
    {name: 'ArchWiki', url: 'https://wiki.archlinux.org/index.php/'},
    {name: 'Wikipedia', url: 'https://en.wikipedia.org/w/index.php'},
    {name: 'Reddit', url: 'https://reddit.com/search/'},
    {name: 'StackOverflow', url: 'https://stackoverflow.com/'}
];

function chgAction() {    
    provider = providers[index];
    searchform.action = provider.url;
    input.placeholder = provider.name;

    if (provider.name === 'Wikipedia' || provider.name === 'ArchWiki') {
        input.setAttribute('name', 'search');
    } else {
        input.setAttribute('name', 'q');
    }

    if (index < providers.length) {
        index++;
    } else {
        index = 0;
    }

    document.documentElement.setAttribute('index', index);
}

input.addEventListener('keydown', function (e) {
    if (e.key == 'Tab') {
        e.preventDefault();
        chgAction();
    }
});