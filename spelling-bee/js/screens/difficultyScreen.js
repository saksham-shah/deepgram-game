function DifficultyScreen () {
    this.buttons = [];

    
    this.buttons.push(new Button(width/2 - 100, height /2 , 100, 50, "Start Easy",
        function() {
            gameScreen.start(0);
        }
    ));

    this.buttons.push(new Button(width/2 + 100, height /2 , 100, 50, "Start Hard",
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
    textSize(50);
    textAlign(CENTER);
    text("Select difficulty!", width/2, height / 4);
    pop();

    for (var i = 0; i < this.buttons.length; i++) {
        this.buttons[i].draw();
    }
}