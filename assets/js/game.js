// Variables

  var alphabet = [
  		'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h',
        'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's',
        't', 'u', 'v', 'w', 'x', 'y', 'z'
  	];
  
  var categories;         // Array of topics
  var chosenCategory;     // Selected category
  var getHint ;          // Word getHint
  var word ;              // Selected word
  var guess ;             // Guess
  var guesses = [ ];      // Stored guesses
  var lives ;             // Lives
  var counter ;           // Count correct guesses

  // Element Storage
  var showLives = document.querySelector("#mylives");
  var showCategory = document.querySelector("#scategory");
  var getHint = document.querySelector("#hint");
  var showClue = document.querySelector("#clue");
  var audio = new Audio('assets/audio/game-over.mp3');
  var winnerAudio = new Audio('assets/audio/you-win.wav');
  var coinAudio = new Audio('assets/audio/coin.wav');
  var errorAudio = new Audio('assets/audio/error.wav');

  // Create Alphabet
  function buttons() {
    myButtons = document.querySelector('#buttons');
    letters = document.createElement('ul');

    for (var i = 0; i < alphabet.length; i++) {
      letters.id = 'alphabet';
      list = document.createElement('li');
      list.id = alphabet[i];
      list.innerHTML = alphabet[i];
      list.onclick = check;
      myButtons.appendChild(letters);
      letters.appendChild(list);
    }
  }

    // OnClick Function
    function check() {
      var guess = (this.innerHTML);
      this.onclick = null;

      checkForWin(guess);
    }

  function checkForWin(guess)
  {
      document.getElementById(guess).setAttribute("class", "active");

      for (var i = 0; i < word.length; i++) {
        if (word[i] === guess) {
          guesses[i].innerHTML = guess;
          counter += 1;
          coinAudio.play();
        } 
      }
      var j = (word.indexOf(guess));
      if (j === -1) {
        lives -= 1;
        comments();
        errorAudio.play();
      } else {
        comments();
      }
  }
  
  // Function Adds Class That Triggers Event in CSS
  function addClass(myClassId, myClassName) {
  	var hideClass = document.querySelector(myClassId);
  	hideClass.className += myClassName;
  }
  
  // Select Category
  function selectCat() {
    if (chosenCategory === categories[0]) {
      categoryName.innerHTML = "The Category Is Harry Potter";
      addClass('.wrapper', ' harry-bg');
      addClass('#alphabet', ' harry-style');
      addClass('#reset', ' harry-style');
    } else if (chosenCategory === categories[1]) {
      categoryName.innerHTML = "The Category Is Indiana Jones";
      addClass('.wrapper', ' indy-bg');
      addClass('#alphabet', ' indiana-style');
      addClass('#reset', ' indiana-style');
    } else if (chosenCategory === categories[2]) {
      categoryName.innerHTML = "The Category Is Nintendo";
      addClass('.wrapper', ' nintendo-bg');
      addClass('#alphabet', ' mario-style');
    }
  }

  // Store Guesses
   function result() {
    wordHolder = document.querySelector('#hold');
    correct = document.createElement('ul');

    for (var i = 0; i < word.length; i++) {
      correct.setAttribute('id', 'my-word');
      guess = document.createElement('li');
      guess.setAttribute('class', 'guess');
      if (word[i] === "-") {
        guess.innerHTML = "-";
      } else {
        guess.innerHTML = "_";
      }

      guesses.push(guess);
      wordHolder.appendChild(correct);
      correct.appendChild(guess);
    }
  }
  
  // Show Lives
   function comments() {
    showLives.innerHTML = "You have " + lives + " lives";
    if (lives < 1) {
      showLives.innerHTML = "Game Over! <br> Loser!";
      addClass('#buttons', 'hide-me');
      addClass('#mylives', 'bigger');
      audio.play();
    }

    for (var i = 0; i < guesses.length; i++) {
      if (counter === guesses.length) {
        showLives.innerHTML = "You Win!";
        winnerAudio.play();
      }
    }
  }

  // Play
    categories = [
        ["hermione", "snape", "voldemort", "hedwig", "hagrid"],
        ["indiana", "marion", "round", "spielberg", "fedora"],
        ["mario", "peach", "luigi", "wario", "kong"]
    ];

    chosenCategory = categories[Math.floor(Math.random() * categories.length)];
    word = chosenCategory[Math.floor(Math.random() * chosenCategory.length)];
    console.log(word);
    buttons();

    guesses = [ ];
    lives = 5;
    counter = 0;
    result();
    comments();
    selectCat();


  // Hints / Clues
    hints = [
        ["Ron's future wife", "Professor who loves Harry's mom", "He who shall not be named", "Harry's Owl", "Sometimes known as Hagger"],
        ["The main character!", "Indiana's love interest", "Indiana's forgettable sidekick, short...", "Director of the films", "Indiana's Hat"],
        ["Main character of the Nintendo universe", "The Princess in Pink", "Mario's little brother", "Mario's fat arch nemesis", "The Ape that likes bananas and stars in his own games! Donkey..."]
    ];

    var categoryIndex = categories.indexOf(chosenCategory);
    var hintIndex = chosenCategory.indexOf(word);
    showClue.innerHTML = "Hint: " +  hints [categoryIndex][hintIndex];
  
   // Reset

  document.getElementById('reset').onclick = function() {
    correct.parentNode.removeChild(correct);
    letters.parentNode.removeChild(letters);
    location.reload();
    playGame();
  }

  document.onkeyup = function() {
    var code = event.keyCode;

    // check for alpha chars
    if (code <= 90 && code >= 65)
    {
      checkForWin(String.fromCharCode(code).toLowerCase());
    }
  }