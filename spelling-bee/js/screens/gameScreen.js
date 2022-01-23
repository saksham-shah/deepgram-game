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

    this.buttons.push(new Button(width/2 - 100, height /2 + 200 , 180, 50, "Start spelling",
        function() {
            gameScreen.game.recording = true;

            for (let i = 1; i < gameScreen.buttons.length; i++) {
                gameScreen.buttons[i].disable();
            }
        }
    ));

    this.buttons.push(new Button(width/2 + 100, height /2 + 200, 180, 50, "Repeat Word Please",
        function() {
            window.speechSynthesis.speak(new SpeechSynthesisUtterance(gameScreen.game.currentWord));
        }
    ));

    this.buttons.push(new Button(width/2 - 300, height /2 + 270 , 180, 50, "Definition?",
        function() {
            window.speechSynthesis.speak(new SpeechSynthesisUtterance("The definition is " + gameScreen.game.currentDefinition));
        }
    ));

    this.buttons.push(new Button(width/2 - 100, height /2 + 270 , 180, 50, "Language of origin?",
        function() {
            window.speechSynthesis.speak(new SpeechSynthesisUtterance(gameScreen.game.currentLanguageOfOrigin));
        }
    ));

    this.buttons.push(new Button(width/2 + 100, height /2 + 270 , 180, 50, "Type of word?",
        function() {
            window.speechSynthesis.speak(new SpeechSynthesisUtterance(gameScreen.game.currentWordType));
        }
    ));

    this.buttons.push(new Button(width/2 + 300, height /2 + 270 , 180, 50, "Example of sentence?",
        function() {
            window.speechSynthesis.speak(new SpeechSynthesisUtterance(gameScreen.game.currentSentenceExample));
        }
    ));

    
}

GameScreen.prototype.start = function (difficulty) {
    this.game = new Game(difficulty, difficulty == 0 ? easyWords : words, 5);
    screen = gameScreen;   
}

GameScreen.prototype.mouseClicked = function() {
    for (var i = 0; i < this.buttons.length; i++) {
        this.buttons[i].mouseClicked();
    }
};

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
    background(0,55,115);

    rectMode(CORNER);
    fill(0, 30, 60);
    rect(0, 0, width, 100);

    fill(255);
    textSize(50);
    textAlign(CENTER, CENTER);

    switch(this.game.difficulty){
        case 0: 
            text("Easy mode", width/2, 50);
            break;
        default:
            text("Hard mode", width/2, 50);
            break;
    }

    textSize(30);
    //Draw Score

    text("Word " + (this.game.wordIndex + 1) + " / " + this.game.numOfQuestions, width * 0.2, height/4);

    text("Score: " + this.game.score, width * 0.8, height / 4);
    

    pop();

    for (var i = 0; i < this.buttons.length; i++) {
        this.buttons[i].draw();
    }

    this.game.draw();
}