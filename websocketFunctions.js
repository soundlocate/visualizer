function connect() {
    //etablish websockets connection
    var server = getUrlParam("s");
    webSocket = new WebSocket("ws://" + (server != null ? server : "localhost:8080"));
    document.getElementById("container").innerHTML = '<div id="connecting">connecting...</div>';
    
    webSocket.onopen = onConnect;
    webSocket.onerror = onError;
    webSocket.onclose = onError;
    webSocket.onmessage = onMessage;
}

function onConnect() {
    document.getElementById("container").innerHTML = '';
    initScene();
    animate();
}
    
function onError(e) {
    document.getElementById("container").innerHTML = '<div id="errorPic">An Error occured!</div>';
}

function onMessage(m) {
    var ball = JSON.parse(m.data);
    //console.log(ball);
    
    spawnBall(ball.c, ball.s, ball.p);
}