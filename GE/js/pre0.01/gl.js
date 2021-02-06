function main() {
	var scene = new THREE.Scene();
	var camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
	var renderer = new THREE.WebGLRenderer();
	renderer.setSize(window.innerWidth,window.innerHeight);
	renderer.domElement.id = "game-canvas";
	document.getElementById("canvas-box").appendChild(renderer.domElement);
	var geometry = new THREE.CubeGeometry(1,1,1);
	var texture = THREE.ImageUtils.loadTexture("https://cdn2021.github.io/GE/img/earth.bmp",null,function(t){
		
	});
	var material = new THREE.MeshBasicMaterial({map:texture});
	var cube = new THREE.Mesh(geometry,material);

	scene.add(cube);
	camera.position.z = 5;
	sessionStorage.setItem("camera-x",camera.position.x);
	sessionStorage.setItem("camera-y",camera.position.y);
	sessionStorage.setItem("camera-z",camera.position.z);
	function render() {
		requestAnimationFrame(render);
		cube.rotation.x += 0.01;
		cube.rotation.y += 0.01;
		cube.rotation.z += 0.01;
		camera.position.x = Number(sessionStorage.getItem("camera-x"));
		camera.position.y = Number(sessionStorage.getItem("camera-y"));
		camera.position.z = Number(sessionStorage.getItem("camera-z"));
		renderer.render(scene,camera);
	}
	render();
	setInterval(function(){
		if (sessionStorage.getItem("loginstatus") == "ok")
		{
			document.getElementById("login-title").innerHTML = "";
			document.getElementById("login-box").innerHTML = "";
		}
	},200);
}

function keypress(event)
{
	console.log(code);
	var code = event.keycode;
	var table = sessionStorage.getItem("key");
	if (parseInt(table.w) == code))
		sessionStorage.setItem("camera-z",parseInt(sessionStorage.getItem("camera-z")) + 1);
}
