const services = {
  'Google': {
    url: 'https://www.google.com/search?q=',
    icon: 'https://raw.githubusercontent.com/sistematico/startpages/main/minimal/img/google.svg'
  },
  'DuckDuckGo': {
    url: 'https://duckduckgo.com/?q=',
    icon: 'https://raw.githubusercontent.com/sistematico/startpages/main/minimal/img/ddg.svg'
  }
}
let currentService = 'Google'

document.getElementById('multiSearch').addEventListener('keydown', function (event) {
  const input = this;
  const iconElement = document.getElementById('currentServiceIcon')

  if (event.key === 'Enter') {
    const query = input.value;
    const searchUrl = services[currentService].url + encodeURIComponent(query)
    const newWindow = window.open(searchUrl, '_blank')

    if (!newWindow) {
      alert('O bloqueador de pop-ups está ativado. Por favor, desative para continuar.')
    } else {
      newWindow.focus()
    }
  } else if (event.key === 'Tab') {
    event.preventDefault()
    const servicesKeys = Object.keys(services)
    const currentServiceIndex = servicesKeys.indexOf(currentService)
    currentService = servicesKeys[(currentServiceIndex + 1) % servicesKeys.length]
    iconElement.innerHTML = services[currentService].icon
    input.placeholder = currentService
  }
})