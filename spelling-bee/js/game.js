function Game(difficulty, words) {
    this.difficulty = difficulty;
    this.wordIndex = 0;
    this.score = 0;
    this.currentWord = null;
    this.guess = "";
    this.guessing = false;
    this.timer = 0;

    this.muted = 0;

    this.words = words;

    this.setup();

    let word = this.getWord();
    this.sayWord(word);
    this.currentWord = word;
    this.guessing = true;
    this.guess = "";
}

Game.prototype.setup = function () {
    navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
        console.log({ stream })
        // Further code goes here
    
        if (!MediaRecorder.isTypeSupported('audio/webm'))
            return alert('Browser not supported');
    
        const mediaRecorder = new MediaRecorder(stream, { mimeType: 'audio/webm' });
    
        //Parameters
        let parameters = "";
    
        //Make Letters keywords so they are understood better
        //This will need to be fine tuned to each letter to make it work well
        weights = {'a': 4,
                    'b': 4,
                    'c': 4,
                    'd': 6,
                    'e': 5,
                    'f': 4,
                    'g': 4,
                    'h': 4,
                    'i': 4,
                    'j': 4,
                    'k': 4,
                    'l': 10,
                    'm': 4,
                    'n': 10,
                    'o': 4,
                    'p': 7,
                    'q': 8,
                    'r': 6,
                    's': 4,
                    't': 4,
                    'u': 4,
                    'v': 4,
                    'w': 4,
                    'x': 6,
                    'y': 8,
                    'z': 7,
                    }
        for (const [letter, weight] of Object.entries(weights)) {
            parameters += "keywords=" + letter + ":" + weight + "&";
        }
    
        let address = "wss://api.deepgram.com/v1/listen?" + parameters;
    
        const socket = new WebSocket(address , [
            'token',
            '27a5bdc23b3730a64b20cdbecf84a9af20906634',
        ]);
    
        socket.onopen = () => {
            console.log({ event: 'onopen' });
    
            mediaRecorder.addEventListener('dataavailable', async (event) => {
                if (event.data.size > 0 && socket.readyState == 1) {
                    socket.send(event.data , );
                }
            })
            mediaRecorder.start(100);
        }
        
        socket.onmessage = (message) => {
            // console.log({ event: 'onmessage', message });
    
            const received = JSON.parse(message.data);
            const transcript = received.channel.alternatives[0].transcript;
            if (transcript && received.is_final && this.muted <= 0 && this.guessing) {
                console.log(transcript);
    
                // Process words here
                let words = transcript.split(" ");
    
                for (let w of words) {
                    if (w.length == 1) {
                        this.processWord(w);
                    }
                }
            }
        }
        
        socket.onclose = () => {
            console.log({ event: 'onclose' })
        }
        
        socket.onerror = (error) => {
            console.log({ event: 'onerror', error })
        }
    });
}

Game.prototype.update = function () {
    // IMPLEMENT nice timing and such
    // if (!this.guessing) {
    //     let word = this.getWord();
    //     this.sayWord(word);
    //     this.currentWord = word;
    //     this.guessing = true;
    //     this.guess = "";
    // }

    if (this.muted > 0) {
        this.muted--;
    }
};

Game.prototype.enterPressed = function () {
    if (!this.guessing) {
        this.wordIndex += 1;

        if (this.wordIndex == this.words) {
            window.speechSynthesis.speak(new SpeechSynthesisUtterance("Game over"));
            resultScreen.setGame(this);
            screen = resultScreen;
            return;
        }

        let word = this.getWord();
        this.sayWord(word);
        this.currentWord = word;
        this.guessing = true;
        this.guess = "";
    }
}

Game.prototype.processWord = function (w) {
    this.guess += w;
    if (this.guess == this.currentWord) {
        this.guessing = false;
        this.score++;
    } else if (!this.currentWord.startsWith(this.guess)) {
        this.guessing = false;
    }
}

Game.prototype.draw = function () {
    push();
    textAlign(CENTER);

    //Draw Score

    if (!this.guessing) {
        textSize(20);
        fill(255);
        text("Press enter", width/2, height * 0.75)
    }

    if (this.guessing || this.guess == this.currentWord) {
        fill(255);
    } else {
        fill(255, 0, 0);
    }

    textSize(50);
    text(this.guess, width/2, height / 2);
    
    pop();
};

Game.prototype.getWord = function () {
    return "elephant";
};


Game.prototype.sayWord = function(word) {
    window.speechSynthesis.speak(new SpeechSynthesisUtterance(word));

    this.muted = 60;
}