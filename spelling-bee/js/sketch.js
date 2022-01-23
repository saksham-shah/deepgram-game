
const CONSTANTS = {
    WIDTH: 1000,
    HEIGHT: 640,
    FLOOR: 500,
    PLAYER_SIZE: 25
}


function setup() {
    createCanvas(CONSTANTS.WIDTH, CONSTANTS.HEIGHT);
    textFont('Verdana');
    menuScreen = new MenuScreen();
    gameScreen = new GameScreen();
    difficultyScreen = new DifficultyScreen ();
    resultScreen = new ResultScreen();

    screen = menuScreen;

    
}

function draw() {
    screen.draw();
    screen.update();
}

function mouseClicked() {
  screen.mouseClicked();
  return false;
}

function keyReleased() {
    if (keyCode == ENTER) {
        if (screen == gameScreen) {
            gameScreen.enterPressed();
        } else if (screen == resultScreen) {
            screen = menuScreen;
        }
    }
}

function getNewWord() {
    return "random";
}

function preload() {
  //myFont = loadFont('Ubuntu-Regular.ttf');
}

let words = [
    {
      "word": "auslaut",
      "definition": "the final sound in a word or syllable",
      "language of origin": "German",
      "word type": "noun",
      "sentence usage": "The speller deftly ignored my hilarious sentence and focussed with razor precision on the auslaut of her word."
    },
    {
      "word": "erysipelas",
      "definition": "an acute febrile disease that is associated with intense local inflammation of the skin and is caused by a heolytic streptococcus",
      "language of origin": "Greek",
      "word type": "noun",
      "sentence usage": "It was a peculiar erysipelas which had started under the chin where the collar chafed and was spreading over the face."
    },
    {
      "word": "bougainvillea",
      "definition": "a vine of a small genus of ornamental tropical woody vines with brilliant red or purple floral bracts",
      "language of origin": "Latin from a French name",
      "word type": "noun",
      "sentence usage": "Alia realised that if she just wore a flower crown made of bougainvillea no one would notice her extremely ill-advised decision to give herself bangs"
    },
    {
      "word": "aiguillette",
      "definition": " a shoulder cord worn by a military aide to the president of the United States and to high-ranking officers",
      "language of origin": "Latin-derived French word",
      "word type": "noun",
      "sentence usage": "New soldiers wore the same uniform as others and were distinguished only by an aiguillette of blue and white silk with brass tips"
    },
    {
      "word": "pendeloque",
      "definition": " a usually pear-shaped glass pendant used for ornamenting a lamp or chandelier",
      "language of origin": " French",
      "word type": "noun",
      "sentence usage": "Among the rings is included a pendeloque attached to which a small ring for suspension"
    }
   ]

let easyWords = [
  {
    "word": "possesses",
    "definition": "to have or own something",
    "language of origin": "Latin",
    "word type": "verb",
    "sentence usage": "Though she is sixty years old she possesses a strong body"
  },
  {
    "word": "difficult",
    "definition": "needing much effort or skill to accomplish",
    "language of origin": "Latin",
    "word type": "adjective",
    "sentence usage": "Taking part in this spelling bee is a very difficult task"
  },
  {
    "word": "elephant",
    "definition": "an extremely large hairless and herbivorous mammal with a trunk and tusks",
    "language of origin": "Greek",
    "word type": "noun",
    "sentence usage": "As the largest land animal in the world the elephant reaches heights of 11 feet"
  },
  {
    "word": "decide",
    "definition": "to make a choice from a number of alternatives",
    "language of origin": "Latin",
    "word type": "verb",
    "sentence usage": "Let our great and wise leader decide for us"
  },
  {
    "word": "answer",
    "definition": "a correct response or a reply to a question",
    "language of origin": "Old English",
    "word type": "noun",
    "sentence usage": "Chocolate is the answer to all life's problems"
  }
 ]