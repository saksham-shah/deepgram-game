console.log("Hello world");

navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
    console.log({ stream })
    // Further code goes here

    if (!MediaRecorder.isTypeSupported('audio/webm'))
        return alert('Browser not supported');

    const mediaRecorder = new MediaRecorder(stream, { mimeType: 'audio/webm' });

    const socket = new WebSocket('wss://api.deepgram.com/v1/listen', [
        'token',
        '27a5bdc23b3730a64b20cdbecf84a9af20906634',
    ]);

    socket.onopen = () => {
        console.log({ event: 'onopen' });

        mediaRecorder.addEventListener('dataavailable', async (event) => {
            if (event.data.size > 0 && socket.readyState == 1) {
                socket.send(event.data);
            }
        })
        mediaRecorder.start(250);
    }
    
    socket.onmessage = (message) => {
        // console.log({ event: 'onmessage', message });

        const received = JSON.parse(message.data);
        const transcript = received.channel.alternatives[0].transcript;
        if (transcript && received.is_final) {
            console.log(transcript);
        }
    }
    
    socket.onclose = () => {
        console.log({ event: 'onclose' })
    }
    
    socket.onerror = (error) => {
        console.log({ event: 'onerror', error })
    }
})