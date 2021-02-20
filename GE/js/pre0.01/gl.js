function main() {
        if (localStorage.getItem("camera-x") == null)
		localStorage.setItem("camera-x",0);
	if (localStorage.getItem("camera-y") == null)
		localStorage.setItem("camera-y",0);
	if (localStorage.getItem("camera-z") == null)
		localStorage.setItem("camera-z",5);
	//初始化摄像机坐标
	document.getElementById("img-memu").className = "show-element";
	//设置菜单可见
	document.getElementById("health-progress").className = "show-element";
	document.getElementById("health-word").className = "show-element";
	document.getElementById("health-title").className = "show-element";
	document.getElementById("water-progress").className = "show-element";
	document.getElementById("water-word").className = "show-element";
	document.getElementById("water-title").className = "show-element";
	document.getElementById("food-progress").className = "show-element";
	document.getElementById("food-word").className = "show-element";
	document.getElementById("food-title").className = "show-element";
	//设置血条、饥饿度、口渴度可见
	var scene = new THREE.Scene();
	//创建场景
	var camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 2000);
	//创建摄像机
	var renderer = new THREE.WebGLRenderer();
	//渲染器
	renderer.setSize(window.innerWidth,window.innerHeight);
	renderer.domElement.id = "game-canvas";
	renderer.domElement.style = "z-index:-1";
	document.getElementById("canvas-box").appendChild(renderer.domElement);
	//添加canvas画布
	var geometry = new THREE.CubeGeometry(1,1,1);
	//创建新的立方体
	var texture = THREE.ImageUtils.loadTexture("https://cdn2021.github.io/GE/img/earth.bmp",null,function(t){
		
	});
	
	var material = new THREE.MeshBasicMaterial({map:texture});
	//设置立方体材质：地球
	var cube = new THREE.Mesh(geometry,material);
	//渲染立方体
	scene.add(cube);
	//添加立方体
	camera.position.z = 5;
	//摄像机坐标z设置为5
	function render() {
		requestAnimationFrame(render);
		//重复执行此函数
		cube.rotation.x += 0.01;
		cube.rotation.y += 0.01;
		cube.rotation.z += 0.01;
		//立方体旋转
		camera.position.x = Number(localStorage.getItem("camera-x"));
		camera.position.y = Number(localStorage.getItem("camera-y"));
		camera.position.z = Number(localStorage.getItem("camera-z"));
		//取得摄像机坐标
		document.getElementById("coordinate").innerHTML = "Coordinate:" + camera.position.x + "," + camera.position.y + "," + camera.position.z;
		//显示摄像机坐标
		renderer.render(scene,camera);
		//渲染场景
	}
	render();
	rend_block(scene,camera,renderer);
	//渲染世界的方块
	if (sessionStorage.getItem("loginstatus") == "ok")
	{
	} else 
	{
		alert("Please login first.");
		location.reload();
	}
	//判断是否登录
	setInterval(function(){
		if (sessionStorage.getItem("loginstatus") == "ok")
		{
			document.getElementById("login-title").innerHTML = "";
			document.getElementById("login-box").innerHTML = "";
			//如果登录了，登录信息设置为空
		}
		document.querySelector("#health-progress").style.width = parseInt(parseInt(localStorage.getItem("health")) / 1920 * 100) + "px";
		document.getElementById("health-word").innerHTML = localStorage.getItem("health") + "/1920";
		//显示玩家血条
		document.querySelector("#food-progress").style.width = parseInt(localStorage.getItem("health")) + "px";
		document.getElementById("food-word").innerHTML = localStorage.getItem("food") + "/100";
		//显示玩家饥饿度
		document.querySelector("#water-progress").style.width = parseInt(localStorage.getItem("health")) + "px";
		document.getElementById("water-word").innerHTML = localStorage.getItem("water") + "/100";
		//显示玩家口渴度
	},200);

}
window.addEventListener("keydown",function(event){
		console.log(event);
		//窃听键盘事件
		var code = event.keyCode;
		var table = localStorage.getItem("key");
		table = JSON.parse(table);
		if (parseInt(table.w) == code)
			localStorage.setItem("camera-z",parseInt(localStorage.getItem("camera-z")) - 1);
		if (parseInt(table.s) == code)
			localStorage.setItem("camera-z",parseInt(localStorage.getItem("camera-z")) + 1);
		if (parseInt(table.a) == code)
			localStorage.setItem("camera-x",parseInt(localStorage.getItem("camera-x")) - 1);
		if (parseInt(table.d) == code)
			localStorage.setItem("camera-x",parseInt(localStorage.getItem("camera-x")) + 1);
		if (parseInt(table.space) == code)
			localStorage.setItem("camera-y",parseInt(localStorage.getItem("camera-y")) + 1);
		if (parseInt(table.shift) == code)
			localStorage.setItem("camera-y",parseInt(localStorage.getItem("camera-y")) - 1);
	
		//玩家移动检查
	
	
	
	});
function open_memu()
{
	document.getElementById("memu").className = "show-element";
	//设置菜单可见
}
function close_memu()
{
	document.getElementById("memu").className = "hide-element";
	//设置菜单不可见
}
function logout()
{
	localStorage.clear();
	sessionStorage.clear();
	db.deleteDB("info","console.log");
	//退出登录
	location.reload();
}
function rend_block(scene,camera,renderer)
{
	//console.log(scene,camera,renderer);
	//渲染世界的方块
	var block = localStorage.getItem("world-block");
	if (block == "" || block == null)
		block = [];
	else
		block = JSON.parse(block);
	//得到方块信息
	var i = 0;
	while (i != block.length)
	{
		var geometry = new THREE.CubeGeometry(block[i].len,block[i].height,block[i].width);
		//console.log(geometry);
		//创建立方体
		if (typeof block[i].texture == "undefined")
		{
			var material = new THREE.MeshBasicMaterial({color:0x00ff00});
			//如果没有材质，默认颜色为#00ff00 绿色
		} else {
			var texture = THREE.ImageUtils.loadTexture(block[i].texture,null,function(t){
				console.log(t);
			});
			//console.log(texture);
			//如果有材质，则加载材质
			var material = new THREE.MeshBasicMaterial({map:texture});
		}
		//console.log(material);
		var cube = new THREE.Mesh(geometry,material);
		cube.position.x = block[i].x;
		cube.position.y = block[i].y;
		cube.position.z = block[i].z;
		//console.log(cube);
		scene.add(cube);
		//添加小立方体
		renderer.render(scene,camera);
		//渲染页面
		i++;
			
	}
}
