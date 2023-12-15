const persianTime = document.getElementById("clock");

const persianDate = document.getElementById("date");
const divElement = document.getElementById("date-eng-ar");
const arabicDate = divElement.querySelector("span");
const spanElements = divElement.querySelectorAll("span");
const englishDate = spanElements[spanElements.length - 1];

//convert any number to persian
function convertToPersianNumber(number) {
  const persianDigits = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
  const numberString = number.toString();

  // Check if the number is already a Persian number
  const isPersianNumber = [...numberString].every((char) =>
    persianDigits.includes(char)
  );

  if (isPersianNumber) {
    return numberString; // Return the number as-is
  } else {
    let persianNumber = "";
    for (let i = 0; i < numberString.length; i++) {
      const digit = parseInt(numberString[i]);
      persianNumber += persianDigits[digit];
    }
    return persianNumber;
  }
}

//convert api digits to persian digits
function convertDatePersian(data) {
  // Iterate over the objects in the 'data' object
  for (const key in data) {
    if (data.hasOwnProperty(key)) {
      const nestedObj = data[key];
      // Iterate over the properties of each nested object
      for (const prop in nestedObj) {
        if (
          nestedObj.hasOwnProperty(prop) &&
          (prop === "dayInMonth" || prop === "year")
        ) {
          const value = nestedObj[prop];
          // Convert the value to Persian number
          const persianNumber = convertToPersianNumber(value);
          // Update the property value with the Persian number
          nestedObj[prop] = persianNumber;
        }
      }
    }
  }
}

//adding date to html
async function addDate() {
  try {
    const response = await fetch(
      "https://kaaryar0506reactblog.liara.run/current/time"
    );
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();

    data.islamicHijri.year = data.islamicHijri.year.replace(/\sهـ$/, "");
    convertDatePersian(data);

    arabicDate.innerHTML = `${data.islamicHijri.year}/${data.islamicHijri.month}/${data.islamicHijri.dayInMonth}`;
    englishDate.innerHTML = `${data.miladi.year} / ${data.miladi.month} / ${data.miladi.dayInMonth}`;
    persianDate.innerHTML = `${data.shamsi.dayInMonth} ${data.shamsi.month}`;
  } catch (error) {
    console.log("Error:", error);
  }
}
addDate();

function showTime() {
  const currentDate = new Date();
  const hours = convertToPersianNumber(currentDate.getHours());
  const minutes = convertToPersianNumber(currentDate.getMinutes());
  const formattedTime = `${hours.toString().padStart(2, '۰')}:${minutes.toString().padStart(2, '۰')}`;
  const persianDateElement =  document.getElementById("clock");
  persianDateElement.innerHTML = formattedTime;
}
setInterval(showTime, 1000);