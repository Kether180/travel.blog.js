//import "./style.css";

const apiKey = "18ebb74c4c845cd84cc98885effee0ae";

const formElement = document.getElementById("city-form");
const inputElement = document.getElementById("city-input");
const cityInformationWrapper = document.getElementById("city-information");

const fetchData = (city) => {
  return fetch(
    `https://api.openweathermap.org/data/2.5/weather?units=metric&q=${city}&appid=${apiKey}`
  ).then((response) => response.json());
};

const createCityInformation = (city) => {
  cityInformationWrapper.innerHTML = "";

  const paragraph = document.createElement("p");
  paragraph.innerHTML = `
      The Weather in ${city.name},${city.sys.country} is
      ${city.main.temp} Celsius 
      <br> Humidity : ${city.main.humidity}</br>
      Wind : ${city.wind.speed}
    `;
  const image = document.createElement("img");
  image.src = `http://openweathermap.org/img/wn/${city.weather[0].icon}@2x.png`;
  cityInformationWrapper.appendChild(paragraph);
  cityInformationWrapper.appendChild(image);
};

// Weather Data
const showCityInformation = (city) => {
  fetchData(city).then((data) => {
    console.log(data);
    //debuggingElement.innerHTML = JSON.stringify(data, null, 2);
    createCityInformation(data);
  });
};

const onSubmit = (event) => {
  event.preventDefault();

  const enteredCity = inputElement.value;
  showCityInformation(enteredCity);
  formElement.reset();
};

formElement.addEventListener("submit", onSubmit);

showCityInformation("");

// add favorite location form--------

let sortDirection = "ASC";

function sortAscending(firstElement, secondElement) {
  return firstElement.name.localeCompare(secondElement.name);
}

const sortTravelers = (travelers) => {
  if (sortDirection === "DESC") {
    return travelers.sort((a, b) => b.name.localeCompare(a.name));
  }

  if (sortDirection === "ASC") {
    return travelers.sort(sortAscending);
  }
};

const getTravelers = () => {
  const travelers = localStorage.getItem("travelers");

  if (!travelers) {
    return [];
  }

  const parsedFriends = JSON.parse(travelers);
  const sortedFriends = sortTravelers(parsedFriends);

  return sortedFriends;
};

const saveTraveler = (traveler) => {
  const travelers = getTravelers();

  console.log("ALL");

  travelers.push(traveler);
  console.log(travelers);
  const stringifiedtravelers = JSON.stringify(travelers);

  localStorage.setItem("travelers", stringifiedtravelers);
};

const removeTravelers = (index) => {
  const travelers = getTravelers();
  travelers.splice(index, 1);

  const stringifiedTravelers = JSON.stringify(travelers);
  localStorage.setItem("travelers", stringifiedTravelers);
};

// Sections
const newTravelForms = document.getElementById("new-travel-form");
const travelsSection = document.getElementById("travel-locations");

// Inputs
const nameInput = document.getElementById("name-input");
const ageInput = document.getElementById("age-input");
const travelLocationInput = document.getElementById("travel-location-input");
const favoriteSeasonInput = document.getElementById("favorite-season-input");

const orderSelect = document.getElementById("order-select");

if (sortDirection === "ASC") {
  document.getElementById("asc-option").selected = true;
} else if (sortDirection === "DESC") {
  document.getElementById("desc-option").selected = true;
}

console.log(orderSelect);

const onOrderSelectChange = (event) => {
  sortDirection = event.target.value;
  console.log(sortDirection);
  createTravelerForm();
};

orderSelect.addEventListener("change", onOrderSelectChange);

const resetForm = () => {
  newTravelForms.reset();
};

// Called whenever the traveler form is submitted
const onFormSubmit = (event) => {
  event.preventDefault();

  const name = nameInput.value;
  const age = ageInput.value;
  const travelLocation = travelLocationInput.value;
  const favoriteSeason = favoriteSeasonInput.value;

  const traveler = {
    name,
    age,
    travelLocation: [travelLocation],
    favoriteSeason
  };

  addTraveler(traveler);
  resetForm();
};

newTravelForms.addEventListener("submit", onFormSubmit);

// Create single form  for a Traveler.
const createSingletravelerForm = (traveler) => {
  let text = `
    <p class="red">Name : ${traveler.name.toUpperCase()}</p>
    <p> Age :  ${traveler.age}</p>
    <p> Favorite Travel Location : ${traveler.travelLocation}</p>
    <p> Favorite Season : ${traveler.favoriteSeason}</p>
  `;

  return text;
};

// Updates all Traveler forms  in our HTML.
const createTravelerForm = () => {
  travelsSection.innerHTML = "";

  const travelers = getTravelers();

  travelers.forEach((traveler, index) => {
    const travelFormElement = document.createElement("div");
    const travelForm = createSingletravelerForm(traveler);
    travelFormElement.innerHTML = travelForm;

    const button = document.createElement("button");
    button.innerHTML = "Remove";
    travelFormElement.appendChild(button);
    button.addEventListener("click", () => {
      console.log(index);
      removeTravelers(index);
      createTravelerForm();
    });

    travelsSection.appendChild(travelFormElement);
  });
};

// Adds a traveler to our list of travelers and updates our view.
const addTraveler = (travelers) => {
  console.log("iiii");
  console.log(travelers);

  saveTraveler(travelers);
  createTravelerForm();
};

createTravelerForm();

const confirmElement = document.getElementById("confirm-booking");

const onSubmitBooking = (event) => {
  event.preventDefault();
  alert("ja");
};

confirmElement.addEventListener("submit", onSubmitBooking);
