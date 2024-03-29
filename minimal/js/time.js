function updateDateTime() {
  let now = new Date()
  let hours = now.getHours()
  let minutes = now.getMinutes()
  let seconds = now.getSeconds()

  hours = hours < 10 ? '0' + hours : hours
  minutes = minutes < 10 ? '0' + minutes : minutes
  seconds = seconds < 10 ? '0' + seconds : seconds

  let greeting = '<i class="fa-solid fa-moon"></i> Boa noite'

  if (hours < 12) {
    greeting = '<i class="fa-solid fa-sun"></i> Bom dia'
  } else if (hours < 18) {
    greeting = '<i class="fa-solid fa-sun"></i> Boa tarde'
  }

  document.getElementById('greeting').innerHTML = greeting
  document.getElementById('time').textContent = `${hours}:${minutes}:${seconds}`
}

setInterval(updateDateTime, 1000)
updateDateTime()