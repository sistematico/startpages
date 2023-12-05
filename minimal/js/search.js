let currentService = 'Google'
const imageUrl = 'https://raw.githubusercontent.com/sistematico/startpages/main/minimal/img/'

const form = document.getElementById('searchform')
const input = document.getElementById('search')
const icon = document.getElementById('currentServiceIcon')

const services = {
  'Google': { url: 'https://www.google.com/search', icon: 'google.svg' },
  'DuckDuckGo': { url: 'https://duckduckgo.com/?q=', icon: 'duckduckgo.svg' },
  'YouTube': { url: 'https://www.youtube.com/results', icon: 'youtube.svg' },
  'StackOverflow': { url: 'https://stackoverflow.com/search', icon: 'stackoverflow.svg' },
  'Wikipedia': { url: 'https://en.wikipedia.org/w/index.php', icon: 'duckduckgo.svg' },
  'Reddit': { url: 'https://reddit.com/search/', icon: 'duckduckgo.svg' },
  'ArchWiki': { url: 'https://wiki.archlinux.org/index.php/', icon: 'archlinux.svg' },
  'X': { url: 'https://twitter.com/search', icon: 'x.svg' },
}

input.addEventListener('keydown', function (event) {
  if (event.key === 'Tab') {
    event.preventDefault()

    const servicesKeys = Object.keys(services)
    const currentServiceIndex = servicesKeys.indexOf(currentService)
    currentService = servicesKeys[(currentServiceIndex + 1) % servicesKeys.length]
    
    input.placeholder = ''
    icon.src = imageUrl + services[currentService].icon
    form.action = services[currentService].url

    if (currentService === 'Wikipedia' || currentService === 'ArchWiki') {
      input.setAttribute('name', 'search')
    } else if (currentService === 'Youtube') {
      input.setAttribute('name', 'search_query')
    } else {
      input.setAttribute('name', 'q')
    }
  }
})







