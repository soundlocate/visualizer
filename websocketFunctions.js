function connect() {
    //etablish websockets connection
    var server = getUrlParam("s");
    webSocket = new WebSocket("ws://" + (server != null ? server : "localhost:8080"));
    webSocket.binaryType = 'arraybuffer';
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
    var data = m.data;
    var dv = new DataView(data);
    var freq = dv.getFloat64(0);
    var x    = dv.getFloat64(8);
    var y    = dv.getFloat64(16);
    var z    = dv.getFloat64(24);
    //if(freq == 500)
        spawnArrow(freq, x, y, z);
}