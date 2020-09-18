const toggleSwitch = document.querySelector('.theme-switch input[type="checkbox"]');
const currentTheme = localStorage.getItem('theme');
const logo = document.getElementById("logo");
const icon = document.getElementById("icon");

if (currentTheme) {
    document.documentElement.setAttribute('data-theme', currentTheme);
  
    if (currentTheme === 'dark') {
        toggleSwitch.checked = true;
        logo.classList.add("invert");
        icon.src = "img/sun.svg";
    }
}

function switchTheme(e) {
    if (e.target.checked) {
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
        logo.classList.add("invert");
        icon.src = "img/sun.svg";
    } else {
        document.documentElement.setAttribute('data-theme', 'light');
        localStorage.setItem('theme', 'light');
        logo.classList.remove("invert");
        icon.src = "img/moon.svg";
    }    
}

//toggleSwitch.addEventListener('change', switchTheme, false);

logo.addEventListener('click', switchTheme, false);