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
  const sixPlayerMapRadio = document.getElementById("6 map size");
  const fivePlayerMapRadio = document.getElementById("5 map size");
  const sixPlayersRadio = document.getElementById("6 player");
  const player2Radio = document.getElementById("2 player");
  const player3Radio = document.getElementById("3 player");

  const mapRadios = document.querySelectorAll(
    'input[name="radio-group-map-size"]'
  );
  const playersRadios = document.querySelectorAll(
    'input[name="radio-group-players"]'
  );

  //block game for 2 players if kronos checked
  function canSelectPlayer2() {
    return !kronosCheckbox.checked;
  }

  player2Radio.addEventListener("change", function () {
    if (!canSelectPlayer2()) {
      player2Radio.checked = false;
      alert("Ви не можете обрати гру на двох при увімкненому режимі 'Кронос'");
    }
  });

  kronosCheckbox.addEventListener("change", function () {
    if (kronosCheckbox.checked) {
      player2Radio.disabled = true;
    } else {
      player2Radio.disabled = false;
    }
  });
  // manage kronos
  kronosCheckbox.addEventListener("change", function () {
    if (kronosCheckbox.checked) {
      sixPlayerMapRadio.checked = true;
      player2Radio.disabled = true;
      if (player2Radio.checked) {
        player3Radio.checked = true;
      }
    } else {
      fivePlayerMapRadio.checked = true;
      sixPlayersRadio.checked = false;
      player2Radio.disabled = false;
    }
  });

  // mange map size
  mapRadios.forEach((radio) => {
    radio.addEventListener("change", function () {
      if (radio.value === "6") {
        if (!kronosCheckbox.checked) {
          kronosCheckbox.checked = true;
          player2Radio.disabled = true;
        }
      } else if (radio.value !== "6" && !sixPlayerMapRadio.checked) {
        kronosCheckbox.checked = false;
        sixPlayersRadio.checked = false;
        player2Radio.disabled = false;
      }
    });
  });

  // mange player amount
  playersRadios.forEach((radio) => {
    radio.addEventListener("change", function () {
      if (radio.value === "6") {
        if (!kronosCheckbox.checked) {
          kronosCheckbox.checked = true;
          player2Radio.disabled = true;
        } else if (kronosCheckbox.checked === false) {
          player2Radio.disabled = false;
        }
        sixPlayerMapRadio.checked = true;
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

//displqy hidden gods
document.addEventListener("DOMContentLoaded", function () {
  function getURLParameter(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
  }

  const mapSize = parseInt(getURLParameter("mapSize"));
  const players = parseInt(getURLParameter("players"));

  const hiddenGod1 = document.getElementById("hidden_god_1");
  const hiddenGod2 = document.getElementById("hidden_god_2");
  const hiddenGod3 = document.getElementById("hidden_god_3");

  function updateHiddenElements() {
    const urlParams = new URLSearchParams(window.location.href);
    const kronos_url = urlParams.get("kronos");
    const hiddenElementsToShow = mapSize - players;
    if (kronos_url === "true") {
      hiddenGod1.style.display = hiddenElementsToShow >= 1 ? "block" : "none";
      hiddenGod2.style.display = hiddenElementsToShow >= 2 ? "block" : "none";
      hiddenGod3.style.display = hiddenElementsToShow >= 3 ? "block" : "none";
    } else {
      hiddenGod2.style.display = hiddenElementsToShow >= 1 ? "block" : "none";
      hiddenGod3.style.display = hiddenElementsToShow >= 2 ? "block" : "none";
    }
  }
  updateHiddenElements();
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

function get_current_list_gods() {
  const godElements = document.getElementsByClassName("swapable-img");
  const godSrcList = [];

  for (let i = 0; i < godElements.length; i++) {
    godSrcList.push(godElements[i].src);
  }

  return godSrcList;
}

function shuffle(gods_list) {
  const urlParams = new URLSearchParams(window.location.search);
  active_playres = urlParams.get("players");
  max_players = urlParams.get("mapSize");
  let currentIndex = 0;
  let randomIndex;
  let kronos_url = urlParams.get("kronos");
  let kronos;
  let max_index = max_players - 2;
  swipe_number = max_players - active_playres;
  let swipe_number_before = swipe_number;
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
  if (active_playres === "3") {
    swipe_number--;
  }
  swipe_number = swipe_number_before;

  const before_change_gods_list = get_current_list_gods();

  let before_shuffle_currentIndex = currentIndex;
  let max_recurring_god = 1;
  while (max_recurring_god > 0) {
    max_recurring_god = 0;
    currentIndex = before_shuffle_currentIndex;

    while (currentIndex <= max_index) {
      if (active_playres !== "3") {
        randomIndex = randomIntFromInterval(
          swipe_number_before,
          max_index,
          currentIndex
        );
      } else {
        randomIndex = randomIntFromInterval(swipe_number_before, max_index);
      }
      var tempSrc = gods_list[currentIndex].src;
      gods_list[currentIndex].src = gods_list[randomIndex].src;
      gods_list[randomIndex].src = tempSrc;
      currentIndex++;
    }

    currentIndex = before_shuffle_currentIndex;
    let max_index_shuffle = max_index;
    while (currentIndex <= max_index) {
      if (active_playres !== "3") {
        randomIndex = randomIntFromInterval(
          swipe_number_before,
          max_index,
          currentIndex
        );
      } else {
        randomIndex = randomIntFromInterval(swipe_number_before, max_index);
      }
      var tempSrc = gods_list[max_index_shuffle].src;
      gods_list[max_index_shuffle].src = gods_list[randomIndex].src;
      gods_list[randomIndex].src = tempSrc;
      currentIndex++;
      max_index_shuffle--;
    }
    const current_gods_list = get_current_list_gods();
    if (kronos_url === "true") {
      kronos = 0;
    } else {
      kronos = 1;
    }
    if (active_playres === "3") {
      max_recurring_god = 0;
    } else {
      for (
        let index = swipe_number;
        index < gods_list.length - kronos;
        index++
      ) {
        if (before_change_gods_list[index] === current_gods_list[index]) {
          max_recurring_god++;
        }
      }
    }
  }
}

function randomIntFromInterval(min, max, current_number) {
  let randmoNumber = Math.floor(Math.random() * (max - min + 1) + min);
  while (randmoNumber === current_number) {
    randmoNumber = Math.floor(Math.random() * (max - min + 1) + min);
  }
  return randmoNumber;
}

function randomIntFromInterval(min, max) {
  return (randmoNumber = Math.floor(Math.random() * (max - min + 1) + min));
}
