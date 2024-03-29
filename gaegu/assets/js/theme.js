let t = new URL(window.location.href).searchParams.get("t")
const currentTheme = localStorage.getItem('theme');
const logo = document.querySelector("#logo");
const icon = document.querySelector("#theme-icon");
let theme = 'light';

function removeURLParameter(url, parameter) {
    //prefer to use l.search if you have a location/link object
    var urlparts = url.split('?');   
    if (urlparts.length >= 2) {

        var prefix = encodeURIComponent(parameter) + '=';
        var pars = urlparts[1].split(/[&;]/g);

        //reverse iteration as may be destructive
        for (var i = pars.length; i-- > 0;) {    
            //idiom for string.startsWith
            if (pars[i].lastIndexOf(prefix, 0) !== -1) {  
                pars.splice(i, 1);
            }
        }

        return urlparts[0] + (pars.length > 0 ? '?' + pars.join('&') : '');
    }
    return url;
}

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

if (currentTheme) {
    document.documentElement.setAttribute('data-theme', currentTheme);
  
    if (currentTheme === 'dark') {
        theme = 'dark';
        logo.classList.add("invert");
        icon.src = "assets/img/sun.svg";
    }
} else if (t !== null) {
    theme = t
    switchTheme()
}

icon.addEventListener('click', switchTheme, false);