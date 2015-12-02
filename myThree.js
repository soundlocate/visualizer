function initScene() {
    var WIDTH = window.innerWidth,
        HEIGHT = window.innerHeight;

    camera = new THREE.PerspectiveCamera(60, WIDTH / HEIGHT, 1, 500);
    camera.position.z = 150;
    camera.lookAt(0, 0, 0);

    scene = new THREE.Scene();

    scene.fog = new THREE.Fog(0x111111, 150, 200);
    root = new THREE.Object3D();

    //add outline cube, TODO: changeme to sth. better
    var geometryCube = cube(50);
    geometryCube.computeLineDistances();
    var object = new THREE.LineSegments(geometryCube, new THREE.LineDashedMaterial({
        color: 0xffaa00,
        dashSize: 3,
        gapSize: 1,
        linewidth: 2
    }));
    scene.add(object);

    //adding locator, TODO: rotate me right
    locator = new THREE.Mesh(new THREE.TetrahedronGeometry(10, 0), new THREE.MeshBasicMaterial({
        wireframe: true
    }));
    locator.rotation.x = 360 / 2;
    locator.position.set(0, 0, 0);
    locator.rotation.x = 360 / 2;
    locator.rotation.y = 360 / 2;
    scene.add(locator);


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
}

function spawnBall(color, size, position) {
    var geometry = new THREE.SphereGeometry(size, 32, 32);
    var spawntime = new Date().getTime();
    var rgb = hsvToRgb(color * 235, 75, 75); //the color multiplyer of 235 gives us a more intuitive looking golor spectrum
    var singleColor = (rgb.r << 16) + (rgb.g << 8) + (rgb.b);

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
        transparent: true
    });

    var standartMaterial = new THREE.MeshBasicMaterial({
        color: new THREE.Color(singleColor),
        transparent: true,
        opacity: .7 //this gives us a little smoother spawning ;)
    });

    var object = new THREE.Mesh(geometry, customMaterial);
    object.position.set(position.x, position.y, position.z);
    scene.add(object);

    var spawnTime = new Date().getTime();
    var timer = setInterval(function () {
        object.material.opacity = 1 - (new Date().getTime() - spawntime) / 2000.0; //lifetime in ms
        //  object.position.x -= 1;
        if (object.material.opacity <= 0) {
            scene.remove(object);
            clearInterval(timer);
        }
    }, 10); //max update frequency in ms
}