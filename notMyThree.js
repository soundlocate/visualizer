function loc() {

    var geometry = new THREE.Geometry();
    var home = new THREE.Vector3(0, 0, 0);
    
    var p1 = new THREE.Vector3(0 - 0.080829, 0 - 0.0571548, 0 - 0.14);
    var p2 = new THREE.Vector3(0 - 0.080829, 0 - 0.0571548, 0.28 - 0.14);
    var p3 = new THREE.Vector3(0.242487 - 0.080829, 0 - 0.0571548, 0.14 - 0.14);
    var p4 = new THREE.Vector3(0.080829 - 0.080829, 0.228619 - 0.0571548, 0.14 - 0.14);

    geometry.vertices.push(
        /*@JAVA_MICS@*/
        home,
        new THREE.Vector3(0, -.5, 0)
 );

    return geometry;

}

function cube(size) {
    var h = size * .5;
    var geometry = new THREE.Geometry();

    geometry.vertices.push(
        new THREE.Vector3(-h, -h, -h),
        new THREE.Vector3(-h, h, -h),

        new THREE.Vector3(-h, h, -h),
        new THREE.Vector3(h, h, -h),

        new THREE.Vector3(h, h, -h),
        new THREE.Vector3(h, -h, -h),

        new THREE.Vector3(h, -h, -h),
        new THREE.Vector3(-h, -h, -h),


        new THREE.Vector3(-h, -h, h),
        new THREE.Vector3(-h, h, h),

        new THREE.Vector3(-h, h, h),
        new THREE.Vector3(h, h, h),

        new THREE.Vector3(h, h, h),
        new THREE.Vector3(h, -h, h),

        new THREE.Vector3(h, -h, h),
        new THREE.Vector3(-h, -h, h),

        new THREE.Vector3(-h, -h, -h),
        new THREE.Vector3(-h, -h, h),

        new THREE.Vector3(-h, h, -h),
        new THREE.Vector3(-h, h, h),

        new THREE.Vector3(h, h, -h),
        new THREE.Vector3(h, h, h),

        new THREE.Vector3(h, -h, -h),
        new THREE.Vector3(h, -h, h)
    );

    return geometry;

}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
    requestAnimationFrame(animate);
    render();
}

function render() {
    var time = Date.now() * 0.001;
    renderer.render(scene, camera);
}