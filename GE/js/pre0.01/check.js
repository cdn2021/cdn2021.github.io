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

	
}
