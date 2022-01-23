function MenuScreen () {
    this.buttons = [];

    var playButton = new Button(width/2, height /2 , 200, 80, "Play!",
    function() {
        screen = difficultyScreen;
    }
    )
    this.buttons.push(playButton);
    
    playButton.textSize = 30;

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
    text("Spelling Hero!", width/2, height / 4);
    pop();

    for (var i = 0; i < this.buttons.length; i++) {
        this.buttons[i].draw();
    }

}