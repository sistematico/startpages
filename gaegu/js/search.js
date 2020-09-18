const input = document.getElementById('search');
const searchform = document.getElementById('searchform');
let search = 'google';
const providers = [
    {name: 'Google', url: 'https://www.google.com/search'},
    {name: 'DuckDuckGo', url: 'https://duckduckgo.com/'}
];

function chgAction() {

    // switch (search) {
    //     case 'ddg':

    //         break;
    //     default:
    //         console.log(`Sorry, we are out of ${expr}.`);
    // }

    var pos = GFG_Array.map(function(e) { 
        return e.prop_2; 
    }).indexOf('val_32'); 

    if (search === 'ddg') {
        search = 'google';
        searchform.action = "https://www.google.com/search";
        input.placeholder = 'Google';
    } else if (search === "google") {
        search = 'github';
        searchform.action = "https://github.com/";
        input.placeholder = 'Github';
    } else if (search === 'github') {
        search = 'gitlab';
        searchform.action = "https://gitlab.com/";
        input.placeholder = 'Gitlab';
    } else if (search === 'gitlab') {
        search = 'arch';
        searchform.action = 'https://wiki.archlinux.org/index.php/';
        input.placeholder = 'ArchWiki';
    } else if (search === 'arch') {
        search = 'wikipedia';
        searchform.action = 'https://en.wikipedia.org/w/index.php';
        input.placeholder = 'Wikipedia';
    } else if (search === 'wikipedia') {
        search = 'reddit';
        searchform.action = 'https://reddit.com/search/';
        input.placeholder = 'Reddit';
    } else {
        search = 'ddg';
        searchform.action = 'https://duckduckgo.com/';
        input.placeholder = 'DuckDuckGo';
    }

    if (search === 'wikipedia' || search === 'arch') {
        input.setAttribute('name', 'search');
    } else {
        input.setAttribute('name', 'q');
    }
}

//window.onload = function() {
    input.addEventListener('keydown', function (e) {
        if (e.key == 'Tab') {
            e.preventDefault();
            chgAction();
        }
    });
//};