var countries = ["France", "Canada", "Italy", "Belgium", "Japan", "United Kingdom", "USA", "Qatar", "Norway", "Australia", "Luxembourg", "Monaco", "Sri Lanka", "Angola", "Peru", "South Korea", "Colombia", "Argentina"];
var previousCountry = null;

function getRandomCountry() {
  var random;
  do {
    random = Math.floor(getRandom(0, countries.length));
  } while(random == previousCountry);
  previousCountry = random;
  return countries[random];
}

function countryPress() {
  var randomCountry = getRandomCountry();
  $('.randomCountry').html(randomCountry); // affichage du pays choisi dans une div cachée
  $('.randomCountry').css("opacity", "0"); // cacher la div
  $('.randomCountryImg').attr("src", getImageOfCountry(randomCountry));
  $('.randomCountryImg').css("opacity", "1");
  $('.message').html("");
  $('#running').html("1"); // activer
  startCounter();
}

function getImageOfCountry(randomCountry) {
  var chemin = "../Assets/img/pays/";
  var extension = ".png";
  switch (randomCountry) {
    case "France":
      return chemin + "france" + extension;
      break;
    case "Belgium":
      return chemin + "belgium" + extension;
      break;
    case "Canada":
      return chemin + "canada" + extension;
      break;
    case "Italy":
      return chemin + "italy" + extension;
      break;
    case "Japan":
      return chemin + "japan" + extension;
      break;
    case "United Kingdom":
      return chemin + "england" + extension;
      break;
    case "USA":
      return chemin + "us" + extension;
      break;
    case "Qatar":
      return chemin + "qatar" + extension;
      break;
    case "Norway":
      return chemin + "norway" + extension;
      break;
    case "Australia":
      return chemin + "australia" + extension;
      break;
    case "Monaco":
      return chemin + "monaco" + extension;
      break;
    case "Luxembourg":
      return chemin + "luxembourg" + extension;
      break;
    case "Sri Lanka":
      return chemin + "sri-lanka" + extension;
      break;
    case "Angola":
      return chemin + "angola" + extension;
      break;
    case "Peru":
      return chemin + "peru" + extension;
      break;
    case "Australia":
      return chemin + "australia" + extension;
      break;
    case "South Korea":
      return chemin + "south-korea" + extension;
      break;
    case "Colombia":
      return chemin + "colombia" + extension;
      break;
    case "Argentina":
      return chemin + "argentina" + extension;
      break;
    default:

  }
}

function getRandom(min, max) {
    return Math.random() * (max - min) + min;
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
