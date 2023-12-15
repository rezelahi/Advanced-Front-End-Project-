const tempratureElement = document.getElementById("temprature");
const weatherQuoteElement = document.getElementById("weatherQuote");
const tempratureImg = tempratureElement.nextElementSibling;

const tempratureMinElement = document.getElementById("temprature-min");
const tempratureMaxElement = document.getElementById("temprature-max");

//adding date to html
async function addWeather() {
    try {
      const response = await fetch(
        "https://api.dastyar.io/express/weather?lat=35.67194277&lng=51.42434403&lang=fa&theme=light"
      );
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();

      tempratureElement.innerHTML = `${convertToPersianNumber(Math.floor(data[0].current))}°`;
      tempratureElement.style.color = data[0].textColor;
      weatherQuoteElement.innerHTML = `${data[0].customDescription.text} ${data[0].customDescription.emoji}`;
      tempratureImg.src = `/assets/images/weatherStates/${data[0].weather.icon}.svg`;

      tempratureMinElement.innerHTML = `${convertToPersianNumber(Math.floor(data[0].min))}°`;
      tempratureMaxElement.innerHTML = `${convertToPersianNumber(Math.floor(data[0].max))}°`;
    } catch (error) {
      console.log("Error:", error);
    }
  }

  addWeather();
  //update weather status each hour
  setInterval(addWeather,3600000)