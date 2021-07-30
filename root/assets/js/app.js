/*****************/
/* EDITABLE INFO */
/*****************/

/* -------------------------------------------------------- */

const NAME = 'Lucas'

const CARDS = [
  {
    name: 'Github',
    icon: 'ri-github-fill',
    link: 'https://github.com/',
  },
  {
    name: 'Facebook',
    icon: 'ri-facebook-fill',
    link: 'https://facebook.com',
  },
  {
    name: 'Twitter',
    icon: 'ri-twitter-fill',
    link: 'https://twitter.com',
  },
  {
    name: 'Reddit',
    icon: 'ri-reddit-fill',
    link: 'https://www.reddit.com',
  },
  {
    name: 'PHP SandBox',
    icon: 'zondicons:php-elephant',
    link: 'https://phpsandbox.io',
  },
  {
    name: 'CodeSandbox',
    icon: 'ri-cloud-fill',
    link: 'https://codesandbox.io',
  },
  {
    name: 'Dribbble',
    icon: 'ri-dribbble-fill',
    link: 'https://dribbble.com',
  },
  {
    name: 'Figma',
    icon: 'ri-brush-fill',
    link: 'https://www.figma.com/',
  },
  {
    name: 'YouTube',
    icon: 'ri-youtube-fill',
    link: 'https://www.youtube.com/',
  },
  {
    name: 'LinkedIn',
    icon: 'ri-linkedin-fill',
    link: 'https://www.linkedin.com/',
  },
  {
    name: 'Gmail',
    icon: 'ri-google-fill',
    link: 'https://mail.google.com/',
  },
]

/* -------------------------------------------------------- */

/******************/
/* CLOCK FUNCTION */
/******************/

const DAYS = [
  'Domingo',
  'Segunda',
  'Terça',
  'Quarta',
  'Quinta',
  'Sexta <span class="iconify" data-icon="noto:party-popper" data-inline="false"></span>',
  'Sábado',
]

const MONTHS = [
  'Janeiro',
  'Fevereiro',
  'Março',
  'Abril',
  'Maio',
  'Junho',
  'Julho',
  'Agosto',
  'Setembro',
  'Outubro',
  'Novembro',
  'Dezembro',
]

const currentDate = document.getElementById('currentDate')
const currentTime = document.getElementById('currentTime')
const cardContainer = document.getElementById('cardContainer')
const userName = document.getElementById('userName')

const formatDigit = (digit) => {
  return digit > 9 ? `${digit}` : `0${digit}`
}

const updateDate = () => {
  // Create a new Date object and get the complete Date/Time information
  const completeDate = new Date()

  // Time Variables
  const currentHour = formatDigit(completeDate.getHours())
  const currentMinute = formatDigit(completeDate.getMinutes())

  // Date Variables
  const currentDay = completeDate.getDay()
  const currentNumber = completeDate.getDate()
  const currentMonth = completeDate.getMonth()
  const currentYear = completeDate.getFullYear()

  const dayIcon = '<span class="iconify" data-icon="fxemoji:fullmoonwithface" data-inline="false"></span>'
  const nightIcon = '<span class="iconify" data-icon="fxemoji:newmoonwithface" data-inline="false"></span>'

  // Update the Time
  currentTime.innerHTML = `${currentHour > 6 && currentHour < 18 ? dayIcon : nightIcon}
  ${currentHour % 12 === 0 ? '12' : currentHour % 12}:${currentMinute} ${currentHour > 11 ? 'PM' : 'AM'}`

  // Update the Date
  currentDate.innerHTML = `${DAYS[currentDay]}, ${currentNumber} de ${MONTHS[currentMonth]} de ${currentYear}`

  // Create a Loop
  setTimeout(() => {
    updateDate()
  }, 60000)
}

/******************/
/* CARDS FUNCTION */
/******************/

const printCards = () => {
  for (const card of CARDS) {
    const currentCard = document.createElement('a')
    const currentCardText = document.createElement('p')
    currentCardText.appendChild(document.createTextNode(card.name))
    const currentCardIcon = document.createElement('span')
    currentCardIcon.dataset.icon = card.icon

    // Style the Card Element
    currentCard.classList.add('card')
    currentCard.href = card.link

    // Style the Icon
    currentCardIcon.classList.add('card__icon')
    currentCardIcon.classList.add('iconify')

    // Style the Text
    currentCardText.classList.add('card__name')

    currentCard.append(currentCardIcon)
    currentCard.append(currentCardText)
    cardContainer.appendChild(currentCard)
  }
}

/****************/
/* STARTER CODE */
/****************/

userName.innerHTML = NAME
printCards()
updateDate()
