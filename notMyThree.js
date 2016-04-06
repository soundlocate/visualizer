function loc() {

    var geometry = new THREE.Geometry();

    geometry.vertices.push(

        new THREE.Vector3(0,0,0),
        new THREE.Vector3(0, 0, size),

        new THREE.Vector3(size,0,0),
        new THREE.Vector3(size, 0, size),

        new THREE.Vector3(0, size, 0),
        new THREE.Vector3(0, size, size),

        new THREE.Vector3(size,size,0),
        new THREE.Vector3(size, size, size),

        new THREE.Vector3(0,0,0),
        new THREE.Vector3(size, 0, 0),

        new THREE.Vector3(size,0,0),
        new THREE.Vector3(0, size, 0),

        new THREE.Vector3(0,size,0),
        new THREE.Vector3(size, size, 0),

        new THREE.Vector3(size,size,0),
        new THREE.Vector3(0, 0, 0),

        new THREE.Vector3(0,0,size),
        new THREE.Vector3(size, 0, size),

        new THREE.Vector3(size,0,size),
        new THREE.Vector3(0, size, size),

        new THREE.Vector3(0,size,size),
        new THREE.Vector3(size, size, size),

        new THREE.Vector3(size,size,size),
        new THREE.Vector3(0, 0, 0)

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