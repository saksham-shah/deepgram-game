
const CONSTANTS = {
    WIDTH: 800,
    HEIGHT: 540,
    FLOOR: 500,
    PLAYER_SIZE: 25
}


function setup() {
    createCanvas(CONSTANTS.WIDTH, CONSTANTS.HEIGHT);
    menuScreen = new MenuScreen();
    gameScreen = new GameScreen();
    resultScreen = new ResultScreen();

    screen = menuScreen;

    
}

function draw() {
    screen.draw();
    screen.update();
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