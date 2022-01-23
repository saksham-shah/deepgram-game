function GameScreen () {
    this.buttons = [];
    this.game = null;
    


    
    this.buttons.push(new Button(100, 50 , 100, 50, "Quit",
        function() {
            console.log("QUIT");
            this.game = null;
            screen = menuScreen;
        }
    ));

    this.buttons.push(new Button(width/2 - 100, height /2 + 200, 180, 50, "Repeat Word Please",
        function() {
            console.log("CLICKED");
        }
    ));

    this.buttons.push(new Button(width/2 + 100, height /2 + 200 , 180, 50, "More info please",
        function() {
            console.log("CLICKED");
        }
    ));

    
}

GameScreen.prototype.start = function (difficulty) {
    this.game = new Game(difficulty);
    screen = gameScreen;
    
}

GameScreen.prototype.update = function() {
    for (var i = 0; i < this.buttons.length; i++) {
        this.buttons[i].update();
    }
    this.game.update();
};

GameScreen.prototype.draw = function() {
    push();
    background(30,200,130);
    textSize(50);
    textAlign(CENTER);

    switch(this.difficulty){
        case 0: 
            text("Easy mode!", width/2, height / 4);
            break;
        default:
            text("Hard mode!", width/2, height / 4);
            break;
    }

    textSize(20);
    //Draw Score
    text("Score: " + this.game.score + "/ " + this.game.wordIndex, 3 * width/4, height / 4);
    
    pop();

    for (var i = 0; i < this.buttons.length; i++) {
        this.buttons[i].draw();
    }

    this.game.draw();
}