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

    screen = menuScreen;

    
}

function draw() {
    screen.draw();
    screen.update();


}

function getNewWord() {
    return "random";
}