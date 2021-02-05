if (localStorage.getItem("language") == null)
	localStorage.setItem("language","en-us");
//Set the language
if (localStorage.getItem("key") == null)
	localStorage.setItem("key",JSON.stringify({"w":87,"a":65,"s":"83","d":68,"esc":27,"space":32,"shift":16}));
//Set the hot key.
{
	let xhr = new XMLHttpRequest();
	xhr.open("GET","https://cdn2021.github.io/GE/json/star-position.txt?from=GE&version=pre0.1&get=star-position&time=" + new Date().getTime() + "&id=" + Math.random(),true);
	xhr.send();
	xhr.onreadystatechange = function() {
		if (xhr.readyState == 4 && xhr.status == 200)
			sessionStorage.setItem("star-position",xhr.responseText);
	}
	//Get the position of the stars and save the data.
}
	