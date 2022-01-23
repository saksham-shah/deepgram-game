function Game(difficulty, wordlist, numOfQuestions) {
    this.difficulty = difficulty;
    this.wordIndex = 0;
    this.score = 0;
    this.guess = "";
    this.guessing = false;
    this.timer = 0;

    this.recording = false;

    this.numOfQuestions = numOfQuestions;

    this.wordlist = shuffle(wordlist); // need to shuffle this

    for (let i = 1; i < gameScreen.buttons.length; i++) {
        gameScreen.buttons[i].enable();
    }

    this.currentWord = null;
    this.currentDefinition = null;
    this.currentLanguageOfOrigin = null;
    this.currentWordType = null;
    this.currentSentenceExample = null;

    this.setup();

    let word = this.getWord();
    this.sayWord(word);
    this.currentWord = word;
    this.currentDefinition = this.getDefinition();
    this.currentLanguageOfOrigin = this.getLanguageOfOrigin();
    this.currentWordType = this.getWordType();
    this.currentSentenceExample = this.getSentenceExample();
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
                    'f': 10,
                    'g': 4,
                    'h': 4,
                    'i': 4,
                    'j': 4,
                    'k': 4,
                    'l': 7,
                    'm': 4,
                    'n': 10,
                    'o': 10,
                    'p': 7,
                    'q': 8,
                    'r': 8,
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
            if (transcript && received.is_final && this.recording && this.guessing) {
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

        if (this.wordIndex == this.numOfQuestions) {
            window.speechSynthesis.speak(new SpeechSynthesisUtterance("Game over"));
            resultScreen.setGame(this);
            screen = resultScreen;
            return;
        }

        let word = this.getWord();
        this.sayWord(word);
        this.currentWord = word;
        this.currentDefinition = this.getDefinition();
        this.currentLanguageOfOrigin = this.getLanguageOfOrigin();
        this.currentWordType = this.getWordType();
        this.currentSentenceExample = this.getSentenceExample();
        this.guessing = true;
        this.guess = "";

        this.recording = false;

        for (let i = 1; i < gameScreen.buttons.length; i++) {
            gameScreen.buttons[i].enable();
        }
    }
}

Game.prototype.processWord = function (w) {
    this.guess += w;
    if (this.guess == this.currentWord) {
        this.guessing = false;
        this.score++;
        window.speechSynthesis.speak(new SpeechSynthesisUtterance("Correct"));
    } else if (!this.currentWord.startsWith(this.guess)) {
        this.guessing = false;
    }
}

Game.prototype.draw = function () {
    push();
    textAlign(CENTER);

    //Draw Score

    textSize(20);
    fill(255);
    if (!this.guessing) {
        text("Press enter", width/2, height * 0.7)
    } else if (this.recording) {
        text("Speak now", width/2, height * 0.7)
    }

    textSize(50);

    if (!this.guessing) {
        if (this.guess == this.currentWord) {
            text("Correct!", width / 2, height * 0.55);

            fill(0, 255, 0);
        } else {
            text(this.currentWord, width / 2, height * 0.55);

            fill(255, 0, 0);
        }
    }

    text(this.guess, width/2, height * 0.45);
    
    pop();
};

Game.prototype.getWord = function () {
    return this.wordlist[this.wordIndex].word;
};

Game.prototype.getDefinition = function () {
    return this.wordlist[this.wordIndex]["definition"];
};

Game.prototype.getLanguageOfOrigin = function () {
    return this.wordlist[this.wordIndex]["language of origin"];
};

Game.prototype.getWordType = function () {
    return this.wordlist[this.wordIndex]["word type"];
};

Game.prototype.getSentenceExample = function () {
    return this.wordlist[this.wordIndex]["sentence usage"];
};

Game.prototype.sayWord = function(word) {
    window.speechSynthesis.speak(new SpeechSynthesisUtterance(word));

    this.muted = 60;
}