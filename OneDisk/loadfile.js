function import_files(){
	setTimeout(function(){
		LoadBoxContent("localfile");
	},500);
	setTimeout(function(){
		LoadBoxContent("localfile");
	},1000);
	var files = document.querySelector("#import_local_file").files;
	window.import_file_num = files.length;
	window.import_file = [];
	var s = setInterval(function(){	
		//检查导入是否完成
		if (window.import_file.length == window.import_file_num){
			clearInterval(s);
			//移除div
			document.body.removeChild(box);
			var i = 0;
			var result = {Success:0,Fail:0};
			while (i < window.import_file.length){
				result[window.import_file[i]]++;
				i++;
			};
			alert("The file import is complete.\nSuccessful to import " + result.Success + " files.\nFailed to import " + result.Fail + " files.");
		};
	},200);
	var box = document.createElement("div");
	//创建一个全屏的div，阻止用户点击屏幕
	box.style.height = "100%";
	box.style.width = "100%";
	box.style.position = "fixed";
	box.style.top = "0%";
	box.style.left = "0%";
	box.id = "No-Clicking";
	document.body.appendChild(box);
	var i = 0;
	while (i < files.length){
		runfunc(function(arr){
			var file = arr[0];
			var reader = new FileReader();
			//File对象转成DataURL
			reader.readAsDataURL(file);
			reader.onload = function(){
				var dataurl = reader.result;
				var base64 = dataurl.substring(dataurl.indexOf("base64,")+7);
				//在dataurl中截取出base64编码
				var fileid = parseInt(Math.random().toString().substring(3)).toString(16);
				var filename = file.name;
				if (typeof(filename) == "undefined")
					filename = "null";
				while (typeof(localStorage["onedisk-localfile-file-obj:" + fileid]) != "undefined") {
					var fileid = parseInt(Math.random().toString().substring(3)).toString(16);
				};
				//生成fileid

				var memu_obj = JSON.parse(localStorage["onedisk-localfile-memu-obj:" + window.path]);
				var bool = true;
				var filepath = window.path;
				if (file.size <= 1024){
					var bool = false;
					try {
						localStorage["onedisk-localfile-file-obj:" + fileid] = JSON.stringify({filename:filename,content:base64,path:filepath});
						//储存文件
						memu_obj[memu_obj.length] = {id:fileid,filename:filename,type:'localstorage'};
						localStorage["onedisk-localfile-memu-obj:" + window.path] = JSON.stringify(memu_obj);
						bool = false;
						window.import_file[window.import_file.length] = ["Success"];
					} catch(err){
						console.log(err);
						//无法使用LocalStorage储存文件，改用IndexedDB
						var bool = true;
						memu_obj[memu_obj.length-1].type = "IndexedDB";
					};
				};	
				if (bool) {
					memu_obj[memu_obj.length] = {id:fileid,filename:filename,type:'IndexedDB'};
					localStorage["onedisk-localfile-memu-obj:" + window.path] = JSON.stringify(memu_obj);
					var db = request.result.transaction(["local_file_storage"],"readwrite").objectStore("local_file_storage");
					var r = db.add({file_id:fileid,content:base64,filename:filename,path:filepath});
					r.onsuccess = function(e){
						console.log("成功向本地数据库写入文件");
						window.import_file[window.import_file.length] = ["Success"];
					};
					r.onerror = function(e){
						var memu_obj = JSON.parse(localStorage["onedisk-localfile-memu-obj:" + window.path]);
						memu_obj.splice(memu_obj.length-1,1);
						localStorage["onedisk-localfile-memu-obj:" + window.path] = JSON.stringify(memu_obj);
						console.error("无法向本地数据库写入文件");
						window.import_file[window.import_file.length] = ["Fail"];
						alert("Error:Cannot put the file in the local database.\nPlease check whether your disk space is enough.");
					};
				};
			};
		},[files[i]]);
		i++;
	};
};
function runfunc(func,arr){
	func(arr);
};
var request = window.indexedDB.open("file_storage",1);
request.onerror = function(){
	alert("Cannot open the database of files.");
	location.reload();
};
request.onsuccess = function(){
	console.log("数据库打开成功！");
};
request.onupgradeneeded = function(e){
	db = e.target.result;
	db.createObjectStore("local_file_storage",{keyPath:"file_id"});
	request = window.indexedDB.open("file_storage",1);
	request.onerror = function(){
		alert("Cannot open the database of files.");
		location.reload();
	};
	request.onsuccess = function(){
		console.log("数据库打开成功！");
	};
};