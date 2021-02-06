function main() {
	var scene = new THREE.Scene();
	var camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
	var renderer = new THREE.WebGLRenderer();
	renderer.setSize(window.innerWidth,window.innerHeight);
	document.getElementById("canvas-box").appendChild(renderer.domElement);
	var geometry = new THREE.CubeGeometry(1,1,1);
	var texture = THREE.ImageUtils.loadTexture("https://cdn2021.github.io/GE/img/earth.bmp",null,function(t){
		
	});
	var material = new THREE.MeshBasicMaterial({map:texture});
	var cube = new THREE.Mesh(geometry,material);

	scene.add(cube);
	camera.position.z = 5;
	function render() {
		requestAnimationFrame(render);
		cube.rotation.x += 0.01;
		cube.rotation.y += 0.01;
		cube.rotation.z += 0.01;
		renderer.render(scene,camera);
	}
	render();
}
setInterval(function(){
	document.getElementById("login-title").innerHTML = "";
	document.getElementById("login-box").innerHTML = "";
	loadgame();
},200);
function loadgame()
{
}
