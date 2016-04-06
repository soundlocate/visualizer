function connect() {
    //etablish websockets connection
    webSocket = new WebSocket("ws:///*@JAVA_PORT@*/");
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
    var x    = dv.getFloat64(0);
    var y    = dv.getFloat64(8);
    var z    = dv.getFloat64(16);
    var ampl = dv.getFloat64(24);
    var freq = dv.getFloat64(32);
    spawnArrow(freq, x, y, z, ampl);
}