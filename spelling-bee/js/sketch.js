console.log("Hello world");




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