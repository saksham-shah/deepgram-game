function DifficultyScreen () {
    this.buttons = [];

    
    this.buttons.push(new Button(width/2 - 100, height * 0.9 , 100, 50, "Easy",
        function() {
            gameScreen.start(0);
        }
    ));

    this.buttons.push(new Button(width/2 + 100, height * 0.9 , 100, 50, "Hard",
        function() {
            gameScreen.start(1);
        }
    ));
    
}

DifficultyScreen.prototype.mouseClicked = function() {
    for (var i = 0; i < this.buttons.length; i++) {
        this.buttons[i].mouseClicked();
    }
};

DifficultyScreen.prototype.update = function() {
    for (var i = 0; i < this.buttons.length; i++) {
        this.buttons[i].update();
    }
};

DifficultyScreen.prototype.draw = function() {
    
    push();
    background(0,55,115);
    textAlign(CENTER);

    textSize(50);
    text("How to play", width/2, height/4);

    textSize(20);
    text("You will hear a word you have to spell out loud.", width/2, height / 4 + 100)
    text("You may use the buttons on the screen to gain more information about your word.", width/2, height / 4 + 130)
    text("When you are ready to spell, click the \"Start spelling\" button.", width/2, height / 4 + 160)
    text("Good luck!", width/2, height / 4 + 220)

    rectMode(CORNER);
    fill(0, 45, 90);
    rect(0, height * 0.72, width, height * 0.28);

    fill(255);
    textSize(30);
    text("Select difficulty", width/2, height * 0.8);
    pop();

    for (var i = 0; i < this.buttons.length; i++) {
        this.buttons[i].draw();
    }
}