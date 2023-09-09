// var max_index = 3; //change
// var max_players = 6;
// var active_playres;
// var kronos;
// var max = 6; ////////////////////

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
//manage kronos and 6 map size dependency
document.addEventListener("DOMContentLoaded", function () {
  const kronosCheckbox = document.getElementById("kronosImage");
  const sixPlayerRadio = document.getElementById("6 player map");
  const mapRadios = document.querySelectorAll(
    'input[name="radio-group-map-size"]'
  );

  // manage kronos
  kronosCheckbox.addEventListener("change", function () {
    if (kronosCheckbox.checked) {
      sixPlayerRadio.checked = true;
    } else {
      sixPlayerRadio.checked = false;
    }
  });

  // mange map size
  mapRadios.forEach((radio) => {
    radio.addEventListener("change", function () {
      if (radio.value === "6") {
        if (!kronosCheckbox.checked) {
          kronosCheckbox.checked = true;
        }
      } else if (radio.value !== "6" && !sixPlayerRadio.checked) {
        kronosCheckbox.checked = false;
      }
    });
  });
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
  let gods_images = get_list_gods();
  shuffle(gods_images);
}

function get_list_gods() {
  return document
    .getElementById("gods_order")
    .getElementsByClassName("swapable-img");
}

function shuffle(gods_list) {
  const urlParams = new URLSearchParams(window.location.search);
  active_playres = urlParams.get("players");
  max_players = urlParams.get("mapSize");
  let currentIndex = 0;
  let randomIndex;
  let max_index = active_playres - 1;
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
  for (var i = 0; i < 20; i++) {
    currentIndex = before_shuffle_currentIndex;
    while (currentIndex < max_index) {
      randomIndex = randomIntFromInterval(currentIndex, max_index);
      var tempSrc = gods_list[currentIndex].src;
      gods_list[currentIndex].src = gods_list[randomIndex].src;
      gods_list[randomIndex].src = tempSrc;
      currentIndex++;
    }
  }
  return gods_list;
}

function randomIntFromInterval(min, max) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}
