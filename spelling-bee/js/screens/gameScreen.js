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
            window.speechSynthesis.speak(new SpeechSynthesisUtterance(gameScreen.game.currentWord));
        }
    ));

    this.buttons.push(new Button(width/2 + 100, height /2 + 200 , 180, 50, "Definition?",
        function() {
            window.speechSynthesis.speak(new SpeechSynthesisUtterance("The definition is " + gameScreen.game.currentDefinition));
        }
    ));

/*     this.buttons.push(new Button(width/2 + 100, height /2 + 200 , 180, 50, "Language of origin?",
        function() {
            window.speechSynthesis.speak(new SpeechSynthesisUtterance(gameScreen.game.currentLanguageOfOrigin));
        }
    ));

    this.buttons.push(new Button(width/2 + 100, height /2 + 200 , 180, 50, "Type of word?",
        function() {
            window.speechSynthesis.speak(new SpeechSynthesisUtterance(gameScreen.game.currentLanguageOfOrigin));
        }
    ));

    this.buttons.push(new Button(width/2 + 100, height /2 + 200 , 180, 50, "Example of sentence",
        function() {
            window.speechSynthesis.speak(new SpeechSynthesisUtterance(gameScreen.game.currentLanguageOfOrigin));
        }
    )); */

    
}

GameScreen.prototype.start = function (difficulty) {
    this.game = new Game(difficulty, words, 5);
    screen = gameScreen;   
}

GameScreen.prototype.enterPressed = function () {
    this.game.enterPressed();
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

    switch(this.game.difficulty){
        case 0: 
            text("Easy mode!", width/2, height / 4);
            break;
        default:
            text("Hard mode!", width/2, height / 4);
            break;
    }

    textSize(20);
    //Draw Score
    text("Score: " + this.game.score, 3 * width/4, height / 4);
    
    text("Word " + (this.game.wordIndex + 1) + " / " + this.game.numOfQuestions, width/4, height/4);

    pop();

    for (var i = 0; i < this.buttons.length; i++) {
        this.buttons[i].draw();
    }

    this.game.draw();
}