const currentTheme = localStorage.getItem('theme');
const logo = document.getElementById("logo");
const icon = document.getElementById("icon");
const github = document.querySelector(".octicon-mark-github");
let theme = 'light';

if (currentTheme) {
    document.documentElement.setAttribute('data-theme', currentTheme);
  
    if (currentTheme === 'dark') {
        theme = 'dark';
        logo.classList.add("invert");
        icon.src = "img/sun.svg";
        github.style.fill = 'white'
        //obj[i].style.backgroundColor = color;
    }
}

function switchTheme() {
    if (theme === 'light') {
        theme = 'dark';
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
        logo.classList.add("invert");
        icon.src = "img/sun.svg";
        github.style.fill = 'white'
        //obj[i].style.backgroundColor = color;
    } else {
        theme = 'light';
        document.documentElement.setAttribute('data-theme', 'light');
        localStorage.setItem('theme', 'light');
        logo.classList.remove("invert");
        icon.src = "img/moon.svg";
        github.style.fill = 'black'
        //obj[i].style.backgroundColor = color;
    }    
}

icon.addEventListener('click', switchTheme, false);