document.querySelector(".container-links").classList.add("animated", "bounceInUp")

{  
  const { locCity: city = "campo grande", cityCode = "3467747", locCountry: country = "br" } = localStorage;

  const key = '3dedab9a1e2b6e1cb120ae2f421b477d'
  const apiurl = `https://api.openweathermap.org/data/2.5/weather?id=${cityCode}&lang=pt_BR&appid=${key}`

  {
    const getWeather = async () => {
      const { main, name, weather, clouds } = await (await fetch(apiurl)).json();
      const tempK = main.temp

      let tempConverted = Math.round(tempK - 273.15);
      let descConverted = weather[0].description.charAt(0).toUpperCase() + weather[0].description.slice(1)

      const weatherEl = document.getElementById("weather")
      weatherEl.innerHTML = ''
      weatherEl.innerText = `${name}: ${tempConverted}°C, ${descConverted}`
    }

    getWeather()
  }
}

{
  const date = new Date()
  const weekday = new Intl.DateTimeFormat("pt-BR", { weekday: "long" }).format(date)
  const month = new Intl.DateTimeFormat("pt-BR", { month: "long" }).format(date)
  const day = new Intl.DateTimeFormat("pt-BR", { day: "numeric" }).format(date)
  const year = new Intl.DateTimeFormat("pt-BR", { year: "numeric" }).format(date)

  const weekdayConverted = weekday.charAt(0).toUpperCase() + weekday.slice(1)
  const monthConverted = month.charAt(0).toUpperCase() + month.slice(1)

  document.getElementById("month-date").innerHTML = `${weekdayConverted}, ${day} de ${monthConverted}, ${year}`
}

{
  const price = async () => {
    const coin      = 'bitcoin'; // ethereum, bitcoin
    const coinConverted = coin.charAt(0).toUpperCase() + coin.slice(1)
    const currency  = 'BRL';
    const apiurl    = `https://api.coinstats.app/public/v1/coins/${coin}?currency=${currency}`

    const data = await (await fetch(apiurl)).json();
    const price = Math.round(data.coin.price);
    const priceConverted = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: currency }).format(price)

    document.getElementById("price").innerHTML = `${coinConverted}: ${priceConverted}`
  }

  price()
}

{
  const subreddit = 'worldnews' // brasil, worldnews
  const apiurl = `https://www.reddit.com/r/${subreddit}/.json?`
  //const apiurl = `https://www.reddit.com/r/${subreddit}/random/.json?`
  let postNum = 1

  const updatepost = async () => {
    const data = await (await fetch(apiurl)).json()
    const { title, score, permalink } = data.data.children[postNum].data

    document.getElementById("news-title").innerHTML = title.length > 100 ? `${title.substr(0, 70)}...` : title
    document.getElementById("score-3").innerHTML = `<i class="fa fa-heart"></i> ${score}`
    document.getElementById("news-title-link").href = `https://reddit.com${permalink}`
  }

  updatepost()

  document.getElementById("next-post-news").addEventListener("click", () => {
    postNum++
    updatepost()
  })
}
