//Check the compatible
{
	let err = "";
	if (typeof(Storage) == "undefined")
		err += "Function 'storage' is not supported.\n";
	let canvas = document.querySelector("#test-canvas");
	let gl = canvas.getContext("webgl");
	if (!gl)
		err += "Your browser, operating system, hardware, etc. may not support 'WebGL'\n";
	if (typeof(XMLHttpRequest) == "undefined")
		err += "Your browser does not support 'ajax'\n";
	if (typeof(window.indexedDB) == "undefined")
		err += "Your browser does not support 'indexedDB'\n";
	if (typeof(THREE) == "undefined")
		err += "You don't include 'three.js'\n";
	if (err != "")
	{
		alert(err);
		location.href = "https://cdn2021.github.io/GE/support";
	}


	console.log("%c\n       ", "font-size:500px;background:url('https://pig-cmd.github.io/eso1242a/eso1242a-screen.jpg') no-repeat -135px -1px");
	console.log("%c\n       ", "font-size:1024px;background:url('https://cdn2021.github.io/GE/img/earth.bmp') no-repeat -135px -1px");
	console.log("%cGalactic Empire","font-size:3em;background:black;color:white");
	console.log("Do you want to work with us to develop web 3D games?");
	console.log("Do you want to enhance your programming skills?");
	console.log("Do you want to learn something new?");
	console.log("Do you want to add a rich ink color to your resume?");
	console.log("Join us and develop together!");
	console.log("Air Studios 2021 Recruitment Entry:%c Air Studios 2021 Recruitment Entrance: fat-pig-2020@outlook.com","font-weight:bold;color:red");
	console.log("Please declare in the message that you are from %c the web console","font-weight:bold;color:red");
}
