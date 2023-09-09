var max_index = 3; //change
var max_players = 6;
var active_playres;
var kronos;
var max = 6; ////////////////////

//display kronos image if checkpoint kronos checked
document.addEventListener("DOMContentLoaded", function () {
  const urlParams = new URLSearchParams(window.location.search);
  const kronos_url = urlParams.get("kronos");
  const kronosImage = document.getElementById("kronosImage");
  if (kronos_url === "true") {
    kronosImage.style.display = "block";
  } else {
    kronosImage.style.display = "none";
  }
});

document.addEventListener("DOMContentLoaded", function () {
  const startButton = document.getElementById("startButton");
  const playersRadios = document.querySelectorAll(
    'input[name="radio-group-players"]'
  );
  const mapRadios = document.querySelectorAll(
    'input[name="radio-group-map-size"]'
  );
  const kronosCheckbox = document.getElementById("kronosImage");
  function handleKronosChange() {
    if (kronosCheckbox.checked) {
      mapRadios[0].disabled = true;
      mapRadios[1].checked = true;
    } else {
      mapRadios[0].disabled = false;
    }
  }

  // Attach the handleKronosChange function to the change event of the Kronos checkbox
  kronosCheckbox.addEventListener("change", handleKronosChange);

  // Initialize Kronos behavior
  handleKronosChange();
});

//transfer data for randomizer from config page and treatment exceptions
document.addEventListener("DOMContentLoaded", function () {
  const startButton = document.getElementById("startButton");
  const playersRadios = document.querySelectorAll(
    'input[name="radio-group-players"]'
  );

  function isPlayersSelected() {
    for (const radio of playersRadios) {
      if (radio.checked) {
        return true;
      }
    }
    return false;
  }
  const mapRadios = document.querySelectorAll(
    'input[name="radio-group-map-size"]'
  );

  function isMapSizeSelected() {
    for (const radio of mapRadios) {
      if (radio.checked) {
        return true;
      }
    }
    return false;
  }

  startButton.addEventListener("click", function (event) {
    if (!isPlayersSelected()) {
      event.preventDefault();
      alert("Будь ласка, виберіть кількість гравців перед початком.");
    } else if (!isMapSizeSelected()) {
      event.preventDefault();
      alert("Будь ласка, виберіть розмір мапи перед початком.");
    } else {
      const selectedPlayers = document.querySelector(
        'input[name="radio-group-players"]:checked'
      ).value;
      const mapSize = document.querySelector(
        'input[name="radio-group-map-size"]:checked'
      ).value;
      const kronosCheckbox = document.getElementById("kronosImage");
      const kronosSelected = kronosCheckbox.checked ? "true" : "false";
      const menuURL = `menu.html?players=${selectedPlayers}&mapSize=${mapSize}&kronos=${kronosSelected}`;
      window.location.href = menuURL;
    }
  });
});

//shuffle alg
function shuffle_gods() {
  const urlParams = new URLSearchParams(window.location.search);
  if (urlParams.get("players")) {
    active_playres = urlParams.get("players");
  }

  kronos = urlParams.get("kronos");
  if (kronos === true) {
    max_players = 6;
  } else {
    max_players = 5;
  }
  let gods_images = get_list_gods();
  shuffle(gods_images);
}

function get_list_gods() {
  return document
    .getElementById("Gods_order")
    .getElementsByClassName("swapable-img");
}

function shuffle(gods_list) {
  let currentIndex = 0;
  let randomIndex;
  swipe_number = max_players - active_playres;

  if (swipe_number > 0) {
    currentIndex += swipe_number;
    let swipe_god_index = 0;
    let hidden_god_index = max_index;
    while (swipe_number > 0) {
      var tempSrc = gods_list[hidden_god_index].src;
      gods_list[hidden_god_index].src = gods_list[swipe_god_index].src;
      gods_list[swipe_god_index].src = tempSrc;
      swipe_god_index++;
      hidden_god_index--;
      swipe_number--;
    }
  }
  let before_shuffle_currentIndex = currentIndex;
  for (var i = 0; i < 500; i++) {
    currentIndex = before_shuffle_currentIndex;
    while (currentIndex < max_index) {
      randomIndex = getRandomInt(currentIndex, max_index + 1);
      var tempSrc = gods_list[currentIndex].src;
      gods_list[currentIndex].src = gods_list[randomIndex].src;
      gods_list[randomIndex].src = tempSrc;
      currentIndex++;
    }
  }
  return gods_list;
}

// function getRandomInt(min, max) {
//   const skew = 1;
//   let u = 0,
//     v = 0;
//   while (u === 0) u = Math.random();
//   while (v === 0) v = Math.random();
//   let num = Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);

//   num = num / 10.0 + 0.5;
//   if (num > 1 || num < 0) num = randn_bm(min, max, skew);
//   else {
//     num = Math.pow(num, skew);
//     num *= max - min;
//     num += min;
//   }
//   return Math.floor(num);
// }
