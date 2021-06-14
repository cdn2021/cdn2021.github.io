var tasklist = [];
if (!window.indexedDB || !localStorage){
	if (confirm("Your browser may not support our program completely.\nWe recommend  Microsoft Edge.\nPress 'Confirm' to download the browser.\nPress 'Cancel' to visit the page.")) window.open("https://www.microsoft.com/en-us/edge?r=1");
};

onload = function(){
	/*OpenTask('localfile');
	OpenTask('network_disk');
	OpenTask('cmd');
	ele_minimize();*/
	RenderTasklist();
};
function WindowBox(n,tbn){
	var box = document.createElement("div");
	box.style.height = "95%";
	box.style.width = "100%";
	box.style["background"] = "white";
	box.style.display = "none";
	box.style.position = "fixed";
	box.style.top = "0%";
	box.style.left = "0%";
	box.style.overflow = "auto";
	box.id = n;
	this.ele = box;
	document.body.appendChild(box);
	var titlebar = document.createElement("div");
	titlebar.style.height = "5%";
	titlebar.style.width = "100%";
	titlebar.style.position = "fixed";
	titlebar.style.top = "0%";
	titlebar.style.left = "0%";
	titlebar.innerHTML = tbn+"<hr><span id="+n+".content></span>";
	titlebar.style.color = "black";
	titlebar.style["font-size"] = "100%"; 
	box.appendChild(titlebar);
	var func = document.createElement("span");
	func.style.color = "black";
	func.style.position = "fixed";
	func.style.right = "0%";
	func.style.top = "0%";
	func.innerHTML = "<span onclick=javascript:ele_minimize(); style='color:white;background:blue'>--</span><span onclick=javascript:ele_close('" + n + "'); style='color:white;background:red'>X</span>";
	titlebar.appendChild(func);
};
function RenderTasklist(){
	document.querySelector("#tasklist").innerHTML = "";
	var ele_width = 1 / tasklist.length;
	ele_width = (0.2 > ele_width)?ele_width:0.2;
	ele_width *= 100;
	ele_width += "%";
	var i = 0;
	while (i < tasklist.length){
		var box = document.createElement("span");
		box.class = "task_element";
		box.innerHTML = tasklist[i].name;
		box.style["color"] = "white";
		box.style["font-size"] = "100%";
		box.style["height"] = "85%";
		box.style["border-style"] = "solid";
		box.style["border-color"] = "#ccc"; 
		box.style["border-width"] = "1px";
		box.style["border-bottom-style"] = "solid";
		box.style["border-bottom-color"] = "blue";
		box.style["border-bottom-width"] = "2px";
		box.style["width"] = ele_width;
		box.style["text-align"] = "center";
		box.setAttribute("data-index",i);
		box.onclick = function(){
			document.querySelector("#BingImage").style.display = "none";
			document.querySelector("#Desktop").style.display = "none";
			var j = 0;
			while (j < tasklist.length){
				tasklist[j].box.ele.style.display = "none";
				j++;
			};
			tasklist[this.getAttribute("data-index")].box.ele.style.display = "";
			LoadBoxContent(tasklist[this.getAttribute("data-index")].id);
		};
		document.querySelector("#tasklist").appendChild(box);
		i++;
	};
};
function ele_minimize(){
	var i = 0;
	while (i < tasklist.length){
		tasklist[i].box.ele.style.display = "none";
		i++;
	};
	document.querySelector("#BingImage").style.display = "";
	document.querySelector("#Desktop").style.display = "";
	RenderTasklist();
};
function ele_close(n){
	ele_minimize();
	document.body.removeChild(document.querySelector("#"+n));
	var i = 0;
	while (i < tasklist.length){
		if (tasklist[i].id == n){
			tasklist.splice(i,1);
		};
		i++;
	};
	RenderTasklist();
};
function OpenTask(id){
	var len = tasklist.length;
	tasklist[len] = {};
	tasklist[len].id = id;
	switch(id){
		case 'localfile': 
			tasklist[len].name = "Local File";
			break;
		case 'network_disk':
			tasklist[len].name = "Network Disk";
			break;
		case 'cmd': tasklist[len].name = "Command";
			break;
		case 'tasks': tasklist[len].name = "Tasks";
			break;
		case 'ls': tasklist[len].name = "LoginSystem";
			break;
		default: tasklist[len].name = null;
	};
	tasklist[len].box = new WindowBox(tasklist[len].id,tasklist[len].name);
	tasklist[len].box.ele.style.display = "";
	RenderTasklist();
	document.querySelector("#BingImage").style.display = "none";
	document.querySelector("#Desktop").style.display = "none";
	var j = 0;
	while (j < tasklist.length){
		tasklist[j].box.ele.style.display = "none";
		j++;
	};
	tasklist[len].box.ele.style.display = "";
	LoadBoxContent(tasklist[len].id);
}
function LoadBoxContent(n){
	if (n == "localfile"){
		var ele = document.getElementById(n+".content");
		var str = "<br><br><br><input type=file id=import_local_file accept=* multiple><input type=button value='Import files from the computer.' onclick=javascript:import_files();> <input type=button value=Export onclick=javascript:export_file();> <input type=button value=Delete onclick=javascript:delete_file();> <input type=button value=Paste onclick=javascript:paste_file();> <input type=button value=Cut onclick=javascript:cut_file();> <input type=button value='Select all' onclick=javascript:select_all_checkbox();><br>" + window.path + "<hr>";
		ele.innerHTML = str;	
		if (!lf.renderMemu()) {
			window.path = "main/";
			lf.renderMemu();
		};
	};
	if (n == "network_disk"){
		var username = getcookie("username");
		if (username == null){
			OpenTask("ls");
			RenderTasklist();
			return 302;
		}
	};
	if (n == "ls") {
		var ele = document.getElementById(n+".content");
		var str = "<br><br><br><div style='text-align:center'><span style='font-size:2em;color:red'>Login System</span><br>Username<input type=text id=username placeholder=Username maxlength=24><br>Password<input type=password id=password placeholder=Password maxlength=16><br><input type=button value=Login onclick=javascript:user_login();><br><a href=https://chenglan28.github.io/air-studio/user-login?register>Register</a><br><a href=# onclick=javascript:OauthLogin();>Use your air account to login</a></div>";
		ele.innerHTML = str;	
	};
};
window.path = "main/";
if (localStorage.getItem("onedisk-localfile-memu-obj:main/") == null)
	localStorage.setItem("onedisk-localfile-memu-obj:main/","[]");
var lf = {};
lf.renderMemu = function(){
	var path = window.path;
	var memu_obj = localStorage.getItem("onedisk-localfile-memu-obj:"+path);
	if (memu_obj == null)
		return false;
	memu_obj = JSON.parse(memu_obj);
	var s = "";
	var i = 0;
	while (i < memu_obj.length){
		setbool("file_"+memu_obj[i].id,false);
		s += "<input type=checkbox onclick=javascript:changebool('file_" + memu_obj[i].id + "'); data-FileId=" + memu_obj[i].id + " class=select_files_checkbox> <a href=# onclick=javascript:lf.showfile('" + memu_obj[i].id + "');>" + memu_obj[i].filename + "</a><br>";
		i++;
	};
	s += "<br><font color=red>No more files.</font>";
	document.getElementById("localfile.content").innerHTML += s;
	//console.log(s);
	return true;
};
window.bl = {};
function setbool(key,val){
	window.bl[key] = val;
};
function getbool(key){
	return window.bl[key];
};
function changebool(key){
	window.bl[key] = !window.bl[key];
};
function select_all_checkbox(){
	var i = 0;
	var obj = document.getElementsByClassName("select_files_checkbox");
	while (i < obj.length){
		obj[i].click();
		i++;
	};
};
function delete_file(){
	if (!confirm("Are you sure you want to delete these files?"))
		return -1;
	var memu_obj = JSON.parse(localStorage.getItem("onedisk-localfile-memu-obj:" + window.path));
	var fs = GetAllCheckFile();
	var i = 0;
	while (i < fs.length){
		var fsd = fs[i];
		var j = 0;
		while (j < memu_obj.length){
			if (memu_obj[j].id == fsd){
				var type = memu_obj[j].type;
				memu_obj.splice(j,1);
				
				if (type == "localstorage")
					localStorage.removeItem("onedisk-localfile-file-obj:" + fsd);
				if (type == "IndexedDB"){
					runfunc(function(arr){
						var fsd = arr[0];
						var db = request.result;
						var r = db.transaction(["local_file_storage"],"readwrite").objectStore("local_file_storage").delete(fsd);
						r.onsuccess = function(){
							console.log("文件数据删除成功！");
						};
						r.onerror = function(){
							console.error("无法删除文件！");
							alert("Error:Cannot delete the file in the local database.");
						};
					},[fsd]);
				};
				
			};
			j++;
		};
		i++;
	};
	localStorage.setItem("onedisk-localfile-memu-obj:" + window.path,JSON.stringify(memu_obj));
	LoadBoxContent("localfile");
};
function base64toblob(base64){
	base64 = "data:application/octet-stream;base64," + base64;
	return dataURItoBlob(base64);
};
function export_file(){
	var box = document.createElement("div");
	//创建一个全屏的div，阻止用户点击屏幕
	box.style.height = "100%";
	box.style.width = "100%";
	box.style.position = "fixed";
	box.style.top = "0%";
	box.style.left = "0%";
	box.id = "No-Clicking";
	document.body.appendChild(box);
	//***************************************
	window.export_all = [];
	var memu_obj = JSON.parse(localStorage.getItem("onedisk-localfile-memu-obj:" + window.path));
	var fs = GetAllCheckFile();
	window.export_all_num = fs.length;
	var i = 0;
	while (i < fs.length){
		var fsd = fs[i];
		var j = 0;
		while (j < memu_obj.length){
			if (memu_obj[j].id == fsd){
				var type = memu_obj[j].type;
				
				if (type == "localstorage")
					window.export_all[window.export_all.length] = JSON.parse(localStorage.getItem("onedisk-localfile-file-obj:" + fsd));
				if (type == "IndexedDB"){
					runfunc(function(arr){
						var fsd = arr[0];
						var db = request.result;
						var r = db.transaction(["local_file_storage"]).objectStore("local_file_storage").get(fsd);
						r.onsuccess = function(){
							if (r.result){
								r.result.status = "SUCCESSFUL";
								console.log("文件数据导出成功！");
								window.export_all[window.export_all.length] = r.result;
							} else {
								console.warn("未获得文件数据！");
								window.export_all[window.export_all.length] = {filename:null,content:"",status:"NULL"};
							};
						};
						r.onerror = function(){
							console.error("无法导出文件！");
							window.export_all[window.export_all.length] = {filename:null,content:"",status:"ERROR"};
							alert("Error:Cannot export the file in the local database.");
						};
					},[fsd]);
				};
				
			};
			j++;
		};
		i++;
	};
	var s = setInterval(function(){
		if (window.export_all_num == window.export_all.length){
			var i = 0;
			var res = {SUCCESSFUL:0,NULL:0,ERROR:0};
			while (i < window.export_all.length){
				res[window.export_all[i].status]++;
				i++;
			};
			alert("The file export is complete.\nSuccessful to export " + res.SUCCESSFUL + " files.\nFailed to export " + (res.ERROR + res.NULL) + " files.\nCompressing your files......Please wait for a serveral time.");
			var i = 0;
			var zip = new JSZip();
			while (i < window.export_all.length) {
				zip.file(window.export_all[i].filename,window.export_all[i].content,{base64:true});
				i++;
			};
			zip.generateAsync({type:"blob"})
			.then(function(content) {
				var d = new Date();
				saveAs(content, "Onedisk_LocalFile_ExportFile_" + d.getFullYear() + "-" + (d.getMonth()+1) + "-" + (d.getDate()) + "_" + d.getHours()+"_"+d.getMinutes()+"_"+d.getSeconds()+"_"+d.getMilliseconds() + ".zip");
				document.body.removeChild(box);
			});

			clearInterval(s);
		};
	},200);
	LoadBoxContent("localfile");	
};

function GetAllCheckFile(){
	var eles = document.getElementsByClassName("select_files_checkbox");
	var result = [];
	var i = 0;
	while (i < eles.length){
		var fileid = eles[i].getAttribute("data-fileid");
		if (getbool("file_" + fileid)){
			result[result.length] = fileid;
		};
		i++;
	};
	return result;
};
function OauthLogin(){
	var ele = document.createElement("iframe");
	ele.src = "https://chenglan28.github.io/air-studio/user-oauth?uses=OneDisk";
	ele.id = parseInt(Math.random().toString().substring(3)).toString(16);
	ele.style.display = "none";
	document.body.appendChild(ele);
	var ow = ele.contentWindow;
	ow.postMessage(JSON.stringify({application:"OneDisk",request:["username"],type:"Oauth Login"}));
	
};




































/**
     * base64  to blob二进制
     */
    function dataURItoBlob(dataURI) {
        var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0]; // mime类型
        var byteString = atob(dataURI.split(',')[1]); //base64 解码
        var arrayBuffer = new ArrayBuffer(byteString.length); //创建缓冲数组
        var intArray = new Uint8Array(arrayBuffer); //创建视图

        for (var i = 0; i < byteString.length; i++) {
            intArray[i] = byteString.charCodeAt(i);
        }
        return new Blob([intArray], {type: mimeString});
    }



































































































/* utf.js - UTF-8 <=> UTF-16 convertion
*
* Copyright (C) 1999 Masanao Izumo <iz@onicos.co.jp>
* Version: 1.0
* LastModified: Dec 25 1999
* This library is free. You can redistribute it and/or modify it.
*/

/*
* Interfaces:
* utf8 = utf16to8(utf16);
* utf16 = utf8to16(utf8);
*/

function utf16to8(str) {
var out, i, len, c;

out = "";
len = str.length;
for(i = 0; i < len; i++) {
c = str.charCodeAt(i);
if ((c >= 0x0001) && (c <= 0x007F)) {
out += str.charAt(i);
} else if (c > 0x07FF) {
out += String.fromCharCode(0xE0 | ((c >> 12) & 0x0F));
out += String.fromCharCode(0x80 | ((c >> 6) & 0x3F));
out += String.fromCharCode(0x80 | ((c >> 0) & 0x3F));
} else {
out += String.fromCharCode(0xC0 | ((c >> 6) & 0x1F));
out += String.fromCharCode(0x80 | ((c >> 0) & 0x3F));
}
}
return out;
}

function utf8to16(str) {
var out, i, len, c;
var char2, char3;

out = "";
len = str.length;
i = 0;
while(i < len) {
c = str.charCodeAt(i++);
switch(c >> 4)
{
case 0: case 1: case 2: case 3: case 4: case 5: case 6: case 7:
// 0xxxxxxx
out += str.charAt(i-1);
break;
case 12: case 13:
// 110x xxxx 10xx xxxx
char2 = str.charCodeAt(i++);
out += String.fromCharCode(((c & 0x1F) << 6) | (char2 & 0x3F));
break;
case 14:
// 1110 xxxx 10xx xxxx 10xx xxxx
char2 = str.charCodeAt(i++);
char3 = str.charCodeAt(i++);
out += String.fromCharCode(((c & 0x0F) << 12) |
((char2 & 0x3F) << 6) |
((char3 & 0x3F) << 0));
break;
}
}

return out;
}