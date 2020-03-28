const form = document.querySelector('form');
const card = document.querySelector('.card');
const details = document.querySelector('.details');
const time = document.querySelector('img.time');
const icon = document.querySelector('.icon img');
const forecast = new Forecast();


const updateUI = (data) => {

    // desturcture properties
    const {cityDets,weather} = data; 
    details.innerHTML = ` 
    <div class="text-muted text-uppercase text-center details">
    <h5 class="my-3">${cityDets.EnglishName}</h5>
    <div class="my-3">${weather.WeatherText}</div>
    <div class="display-4 my-4">
      <span>${weather.Temperature.Metric.Value}</span>
      <span>&deg;C</span>
    </div>
  </div>`;

   const iconSrc = `img/icons/${weather.WeatherIcon}.svg`;
   icon.setAttribute('src',iconSrc);

   let timeSrc = weather.IsDayTime ? 'img/day.svg':'img/night.svg';
   time.setAttribute('src',timeSrc);

  if(card.classList.contains('d-none')){
      card.classList.remove('d-none');
  }
}

form.addEventListener("submit", e => {
    e.preventDefault();
    
    const city = form.city.value.trim();
   
    form.reset();

    forecast.updateCity(city)
      .then(data => updateUI(data))
      .catch(err => console.log(err));

    localStorage.setItem('city',city);
})


if(localStorage.getItem('city')){
  forecast.updateCity(localStorage.getItem('city'))
      .then(data => updateUI(data))
      .catch(err => console.log(err))
}


// const updateCity = async (city) => {
//     const cityDets = await getCity(city);
//     const weather = await getWeather(cityDets.Key);
//     return { cityDets,weather };
// }
