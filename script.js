const max_players = 5;
var active_playres = 4;
var max = 6;

function shuffle_gods() {
  let gods_list = get_list_gods();
  let gods_numbers = get_values(gods_list);
  let shuffled_list = shuffle(gods_numbers);

  display_new_values(shuffled_list);
}

function get_list_gods() {
  return document
    .getElementById("Gods_order")
    .getElementsByTagName("li")
    .getAttribute("src");
}

function shuffle(gods_list) {
  const max_index = 3;
  let currentIndex = 0;
  let randomIndex;
  swipe_number = max_players - active_playres;


  
  if (swipe_number > 0) {
    currentIndex += swipe_number;
    let swipe_god_index = 0;
    let hidden_god_index = max_index;
    while (swipe_number > 0) {
      [gods_list[hidden_god_index], gods_list[swipe_god_index]] = [
        gods_list[swipe_god_index],
        gods_list[hidden_god_index],
      ];
      swipe_god_index++;
      hidden_god_index--;
      swipe_number--;
    }
  }
  let before_shuffle_currentIndex = currentIndex;
  for (var i = 0; i < 100; i++) {
    currentIndex = before_shuffle_currentIndex;
    while (currentIndex < max_index) {
      randomIndex = getRandomInt(currentIndex, max_index + 1);

      [gods_list[currentIndex], gods_list[randomIndex]] = [
        gods_list[randomIndex],
        gods_list[currentIndex],
      ];

      currentIndex++;
    }
  }
  return gods_list;
}

function get_values(Elements) {
  let values = [];
  for (var i = 0; i < Elements.length; i++) {
    let value = Elements[i].textContent;
    values.push(value);
  }
  return values;
}

function display_new_values(shuffled_gods) {
  var elements = document
    .getElementById("Gods_order")
    .getElementsByTagName("li")
    .getAttribute("src");

  for (var i = 0; i < elements.length; i++) {
    elements[i].textContent = shuffled_gods[i];
  }
}

function getRandomInt(min, max) {
  const skew = 1;
  let u = 0,
    v = 0;
  while (u === 0) u = Math.random();
  while (v === 0) v = Math.random();
  let num = Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);

  num = num / 10.0 + 0.5;
  if (num > 1 || num < 0) num = randn_bm(min, max, skew);
  else {
    num = Math.pow(num, skew);
    num *= max - min;
    num += min;
  }
  return Math.floor(num);
}

// function get_list_gods() {
//   return document.getElementById("Gods_order").getElementsByTagName("li");
//   //   for (let i = 0; i <= list.length - 1; i++) {
//   //     console.log(list[i]);
//   //   }
// }
// function stir(gods_list) {

// }

// function stir_gods() {
//   let gods_list = get_list_gods();
//   stir(gods_list);
// }
