function MenuScreen () {
    this.buttons = [];

    
    this.buttons.push(new Button(width/2 - 100, height /2 , 100, 50, "Play",
        function() {
            screen = difficultyScreen;
        }
    ));
    
}

MenuScreen.prototype.mouseClicked = function() {
    for (var i = 0; i < this.buttons.length; i++) {
        this.buttons[i].mouseClicked();
    }
};

MenuScreen.prototype.update = function() {
    for (var i = 0; i < this.buttons.length; i++) {
        this.buttons[i].update();
    }
};

MenuScreen.prototype.draw = function() {
    
    push();
    background(0,55,115);
    textSize(50);
    textAlign(CENTER);
    text("SPELLING BEE TRAINER!", width/2, height / 4);
    pop();

    for (var i = 0; i < this.buttons.length; i++) {
        this.buttons[i].draw();
    }
}