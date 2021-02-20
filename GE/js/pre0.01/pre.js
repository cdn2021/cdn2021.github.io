if (localStorage.getItem("language") == null)
	localStorage.setItem("language","en-us");
//Set the language
if (localStorage.getItem("key") == null)
	localStorage.setItem("key",JSON.stringify({"w":87,"a":65,"s":"83","d":68,"esc":27,"space":32,"shift":16}));
//Set the hot key.
{
	let xhr = new XMLHttpRequest();
	xhr.open("GET","https://cdn2021.github.io/GE/json/star-position.txt?from=GE&version=pre0.01&get=star-position&time=" + new Date().getTime() + "&id=" + Math.random(),true);
	xhr.send();
	xhr.onreadystatechange = function() {
		if (xhr.readyState == 4 && xhr.status == 200)
			sessionStorage.setItem("star-position",xhr.responseText);
	};
	//Get the position of the stars and save the data.
}
if (localStorage.getItem("health") == null)
	localStorage.setItem("health",1920);
if (localStorage.getItem("food") == null)
	localStorage.setItem("food",100);
if (localStorage.getItem("water") == null)
	localStorage.setItem("water",100);
//Set the health,food,water of the player.
if (localStorage.getItem("world-block") == null)
{
	let xhr = new XMLHttpRequest();
	xhr.open("GET","https://cdn2021.github.io/GE/json/world-block.txt?from=GE&version=pre0.01&get=world-block&time=" + new Date().getTime() + "&id=" + Math.random(),true);
	xhr.send();
	xhr.onreadystatechange = function() {
		if (xhr.readyState == 4 && xhr.status == 200)
			localStorage.setItem("world-block",xhr.responseText);
	//Get the block of the world.
	};
}
	
