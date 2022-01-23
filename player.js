const CONTROLS = {
    LEFT: 0, RIGHT: 1, SHOOT: 2
};

class Player {
    constructor(x) {
        this.targetX = x;
        this.x = x;

        this.words = [getNewWord(), getNewWord(), getNewWord()];
    }

    processWord(word) {
        for (let i = 0; i < this.words.length; i++) {
            if (this.words[i] == word) {
                this.applyControl(i);
                this.words[i] = getNewWord();
                return true;
            }
        }

        return false;
    }

    update() {
        if (this.x < this.targetX) {
            this.x += 5;
        } else if (this.x > this.targetX) {
            this.x -= 5;
        }
    }

    applyControl(control) {
        switch (control) {
            case CONTROLS.LEFT:
                console.log("left");
                this.targetX -= 100;
                if (this.targetX < CONSTANTS.PLAYER_SIZE) {
                    this.targetX = CONSTANTS.PLAYER_SIZE;
                }
                break;

            case CONTROLS.RIGHT:
                console.log("right");
                this.targetX += 100;
                if (this.targetX > CONSTANTS.WIDTH - CONSTANTS.PLAYER_SIZE) {
                    this.targetX = CONSTANTS.WIDTH - CONSTANTS.PLAYER_SIZE;
                }
                break;

            case CONTROLS.SHOOT:
                console.log("shoot");
                break;
        }
    }

    draw() {
        rectMode(CENTER);
        fill(255);
        noStroke();
        rect(this.x, CONSTANTS.FLOOR - CONSTANTS.PLAYER_SIZE, 2 * CONSTANTS.PLAYER_SIZE, 2 * CONSTANTS.PLAYER_SIZE);

        textSize(20);
        textAlign(RIGHT, CENTER);
        text(this.words[CONTROLS.LEFT], this.x - CONSTANTS.PLAYER_SIZE - 10, CONSTANTS.FLOOR - CONSTANTS.PLAYER_SIZE);
        textAlign(LEFT, CENTER);
        text(this.words[CONTROLS.RIGHT], this.x + CONSTANTS.PLAYER_SIZE + 10, CONSTANTS.FLOOR - CONSTANTS.PLAYER_SIZE);
    }
}