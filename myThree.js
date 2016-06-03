function initScene() {
    var WIDTH = window.innerWidth, 
        HEIGHT = window.innerHeight;

    camera = new THREE.PerspectiveCamera(.7, WIDTH / HEIGHT, 1, 500);
    camera.position.z = 150;
    camera.lookAt(0, 0, 0);

    scene = new THREE.Scene();
    
    lut = new THREE.Lut('rainbow', 1024);
    lut.setMax( 1000 );
    
    //add loactor
    var geometryCube = loc();
    geometryCube.computeLineDistances();
    var object = new THREE.LineSegments(geometryCube, new THREE.LineDashedMaterial({
        color: 0xffffff,
        dashSize: .005,
        gapSize: .005,
        linewidth: 5
    }));
    scene.add(object);

    var geometry = new THREE.SphereGeometry( 0.01, 32, 32 );
    var material = new THREE.MeshBasicMaterial( {color: 0xffff00} );
    var sphere = new THREE.Mesh( geometry, material );
    var pos = -1 * size / 2;
    sphere.position.set(pos, pos, pos);
    console.log(sphere);
    scene.add(sphere);

    
    /*var legend = lut.setLegendOn({'layout': 'vertical', position': { 'x': 1, 'y': 0, 'z': 0 }, 'dimensions': {'width': .1, 'height': .5}} );
    scene.add (legend);
    
    var labels = lut.setLegendLabels( { 'title': 'Frequency', 'um': 'Hz', 'ticks': 3, 'fontsize': 10} );

    scene.add (labels['title']);

    for ( var i = 0; i < Object.keys( labels[ 'ticks' ] ).length; i++ ) {
        scene.add ( labels[ 'ticks' ][ i ] );
        scene.add ( labels[ 'lines' ][ i ] );
    }*/
    

    renderer = new THREE.WebGLRenderer({
        antialias: true
    });
    renderer.setClearColor(0x111111);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(WIDTH, HEIGHT);

    var container = document.getElementById('container');
    container.appendChild(renderer.domElement);

    window.addEventListener('resize', onWindowResize, false);
    controls = new THREE.OrbitControls(camera, renderer.domElement);

    /*
    //spawning Balls; doesent work properly
    var counter = 0;

    setInterval(function () {
        var position = {x: counter%50 -25, y: Math.round(counter%(50*50)/50) * 5-25, z: -25};
        spawnBall(counter%50/50, position.y / 10, position);
        counter += 5;
    }, 10);
    */
    
    setInterval(crawlMap, 100);
}

function spawnBall(color, size, position) {
    var geometry = new THREE.SphereGeometry(size, 32, 32);
    var spawntime = new Date().getTime();
    var rgb = hsvToRgb(color * 235, 75, 75); //the color multiplyer of 235 gives us a more intuitive looking golor spectrum

    // create custom material from the shader code above
    //   that is within specially labeled script tags
    var customMaterial = new THREE.ShaderMaterial({
        uniforms: {
            "c": {
                type: "f",
                value: 0.0
            },
            "p": {
                type: "f",
                value: 6.0
            },
            glowColor: {
                type: "c",
                value: new THREE.Color(rgb.r, rgb.g, rgb.b)
            },
            viewVector: {
                type: "v3",
                value: camera.position
            }
        },
        vertexShader: document.getElementById('vertexShader').textContent,
        fragmentShader: document.getElementById('fragmentShader').textContent,
        side: THREE.FrontSide,
        blending: THREE.AdditiveBlending,
        transparent: true,
    });

    var object = new THREE.Mesh(geometry, customMaterial);
    object.position.set(position.x, position.y, position.z);
    scene.add(object);

    var spawnTime = new Date().getTime();
    var timer = setInterval(function () {
        object.material.uniforms["c"].value = (new Date().getTime() - spawntime)*.3 / 5000.0; //lifetime in ms
        //  object.position.x += 1;
        if (object.material.uniforms["c"].value > .3) {
            scene.remove(object);
            object = null;
            clearInterval(timer);
            timer = null;
        }
    }, 10); //max update frequency in ms
}

var arrowMap = new Map(); //the map with the arrows inside
function spawnArrow(freq, x, y, z, amplitude) {
    var sourcePos = new THREE.Vector3(0, 0, 0);


    //var targetPos = new THREE.Vector3(y - size / 2, z - size / 2, x - size / 2);
    var targetPos = new THREE.Vector3(y,z,x);

    var direction = new THREE.Vector3().subVectors(targetPos, sourcePos);

    var color = lut.getColor(freq);

    color.r *= amplitude * 20;
    color.g *= amplitude * 20;
    color.b *= amplitude * 20;

    var arrow = new THREE.ArrowHelper(direction.clone().normalize(), sourcePos, .3, color);

    scene.add(arrow);
    if(arrowMap.get(freq) != undefined) {
        scene.remove(arrowMap.get(freq).handle);
    }
    arrowMap.set(freq, {freq: freq, time: new Date().getTime(), handle: arrow, pos: {x: x, y: y, z: z}});
}

function crawlMap() {
    for (var [key, value] of arrowMap) {
      if(value.time + 300 <= new Date().getTime()) {
          scene.remove(value.handle);
          arrowMap.delete(key);
      }
    }
}
