// https://www.youtube.com/results?search_query=php+json+api
(function () {
    const providers = [
        { name: 'Google', url: 'https://www.google.com/search' },
        { name: 'Youtube', url: 'https://www.youtube.com/results' },
        { name: 'DuckDuckGo', url: 'https://duckduckgo.com/' },
        { name: 'StackOverflow', url: 'https://stackoverflow.com/search' },
        { name: 'Wikipedia', url: 'https://en.wikipedia.org/w/index.php' },
        { name: 'Reddit', url: 'https://reddit.com/search/' },
        { name: 'ArchWiki', url: 'https://wiki.archlinux.org/index.php/' }
    ];

    const max = providers.length;
    const input = document.getElementById('search');
    const searchform = document.getElementById('searchform');
    const currentIndex = localStorage.getItem('index');
    let index, provider;

    if (currentIndex) {
        index = currentIndex;
    } else {
        index = 0;
    }

    function chgAction() {
        provider = providers[index];
        searchform.action = provider.url;
        input.placeholder = provider.name;
        input.classList.remove(
            'input-google', 
            'input-youtube', 
            'input-duckduckgo', 
            'input-stackoverflow', 
            'input-wikipedia', 
            'input-reddit', 
            'input-archwiki',
            'input-google-d', 
            'input-youtube-d', 
            'input-duckduckgo-d', 
            'input-stackoverflow-d', 
            'input-wikipedia-d', 
            'input-reddit-d', 
            'input-archwiki-d'
        );
        
        if (localStorage.theme === 'dark') {
            input.classList.add('input-' + provider.name.toLowerCase() + '-d');
        } else {
            input.classList.add('input-' + provider.name.toLowerCase());
        }

        if (provider.name === 'Wikipedia' || provider.name === 'ArchWiki') {
            input.setAttribute('name', 'search');
        } else if (provider.name === 'Youtube') {
            input.setAttribute('name', 'search_query');
        } else {
            input.setAttribute('name', 'q');
        }

        localStorage.setItem('index', index);

        if (index+1 < max) {
            index++;
        } else {
            index = 0;
        }
    }

    input.addEventListener('keydown', function (e) {
        if (e.key == 'Tab') {
            e.preventDefault();
            chgAction();
        }
    });

    chgAction();

})();