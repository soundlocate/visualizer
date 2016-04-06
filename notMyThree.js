function loc() {

    var geometry = new THREE.Geometry();
    var min = size / 2 * -1;
    var max = size / 2;

    geometry.vertices.push(
        new THREE.Vector3(min,min,min),
        new THREE.Vector3(min, min, max),

        new THREE.Vector3(max,min,min),
        new THREE.Vector3(max, min, max),

        new THREE.Vector3(min, max, min),
        new THREE.Vector3(min, max, max),

        new THREE.Vector3(max,max,min),
        new THREE.Vector3(max, max, max),

        new THREE.Vector3(min,min,min),
        new THREE.Vector3(max, min, min),

        new THREE.Vector3(max,min,min),
        new THREE.Vector3(max, max, min),

        new THREE.Vector3(min,max,min),
        new THREE.Vector3(max, max, min),

        new THREE.Vector3(min,max,min),
        new THREE.Vector3(min, min, min),

        new THREE.Vector3(min,min,max),
        new THREE.Vector3(max, min, max),

        new THREE.Vector3(max,min,max),
        new THREE.Vector3(max, max, max),

        new THREE.Vector3(min,max,max),
        new THREE.Vector3(max, max, max),

        new THREE.Vector3(min,max,max),
        new THREE.Vector3(min, min, max)

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