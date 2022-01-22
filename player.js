const CONTROLS = {
    LEFT: 0, RIGHT: 1, SHOOT: 2
};

class Player {
    constructor(x) {
        this.x = x;

        this.words = ["left", "right", "shoot"];
    }

    processWord(word) {
        for (let i = 0; i < this.words.length; i++) {
            if (this.words[i] == word) {
                this.update(i);
                this.words[i] = getNewWord();
                return;
            }
        }
    }

    update(control) {
        switch (control) {
            case CONTROLS.LEFT:
                console.log("left");
                break;

            case CONTROLS.RIGHT:
                console.log("right");
                break;

            case CONTROLS.SHOOT:
                console.log("shoot");
                break;
        }
    }

    draw() {
        fill(255);
        noStroke();
        rect(this.x, CONSTANTS.FLOOR - CONSTANTS.PLAYER_SIZE, 2 * CONSTANTS.PLAYER_SIZE, 2 * CONSTANTS.PLAYER_SIZE);

        // text(this.words[CONTROLS.LEFT])
    }
}