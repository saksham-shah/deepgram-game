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
        console.log({ event: 'onopen' })
    }
    
    socket.onmessage = (message) => {
        console.log({ event: 'onmessage', message })
    }
    
    socket.onclose = () => {
        console.log({ event: 'onclose' })
    }
    
    socket.onerror = (error) => {
        console.log({ event: 'onerror', error })
    }
})