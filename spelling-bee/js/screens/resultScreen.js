function ResultScreen () {
    this.buttons = [];
    this.game = null;
    


    
    this.buttons.push(new Button(100, 50 , 100, 50, "Quit",
        function() {
            console.log("MENU");
            screen = menuScreen;
        }
    ));
    
}

ResultScreen.prototype.setGame = function(game) {
    this.game = game;
}

ResultScreen.prototype.update = function() {
    for (var i = 0; i < this.buttons.length; i++) {
        this.buttons[i].update();
    }
};

ResultScreen.prototype.draw = function() {
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
    text("Score: " + this.game.score + " / " + this.game.numOfQuestions, width/2, height / 2);
    

    pop();

    for (var i = 0; i < this.buttons.length; i++) {
        this.buttons[i].draw();
    }
}