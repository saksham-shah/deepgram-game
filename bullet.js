const CONTROLS = {
    LEFT: 0, RIGHT: 1, SHOOT: 2
};

class Bullet {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    processWord(word) {
        for (let i = 0; i < this.words.length; i++) {
            if (this.words[i] == word) {
                this.applyControl(i);
                // this.words[i] = getNewWord();

                // TODO: REPLACE WORD HERE
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
                break;

            case CONTROLS.RIGHT:
                console.log("right");
                this.targetX += 100;
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