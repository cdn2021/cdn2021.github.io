var JSON = {};
JSON.stringify = function(obj){
	if (typeof obj != "object" && typeof obj != "number" && typeof obj != "boolean")
		return "error";
	if (typeof obj == "number")
		return obj + "";
	if (typeof obj == "boolean")
		return obj.toString();
	//处理对象
	var arr = [];
	var j = 0;
	for (var i in obj)
	{
		arr[j] = i;
		j++;
	}
	//列出所有的键
	var i = 0;
	//判断是否是数组
	if (!(obj instanceof Array))
	{
		//如果不是数组，按对象的方法处理
		var str = "{";
		while (i < arr.length)
		{
			//循环，遍历处理每一个键
			str += "\"" + arr[i] + "\"";
			//构建键到字符串中
			str += ":"
			if (typeof obj[arr[i]] == "string" || typeof obj[arr[i]] == "number" || typeof obj[arr[i]] == "boolean")
			{
				//如果该键的值是数字，不转成字符串
				if (typeof obj[arr[i]] == "number")
					str += obj[arr[i]];
				else
					str += "\"" + obj[arr[i]] + "\"";
				//如果该键的值不是数字，转成字符串
			}				
			else
				str += this.stringify(obj[arr[i]]);
			//如果该键的值是对象类型，递归调用这个函数处理这个对象
			if ((i + 1) < arr.length)
				str += ",";
			//如果该键不在对象的末尾，往字符串后添加","来分隔
			i++;
		}
		str += "}";
		//结束对象
	} else {
		var str = "[";
		while (i < arr.length)
		{
			//循环，遍历处理每一个键
			if (typeof obj[arr[i]] == "string" || typeof obj[arr[i]] == "number" || typeof obj[arr[i]] == "boolean")
			{
				//如果该键的值是数字，不转成字符串
				if (typeof obj[arr[i]] == "number")
					str += obj[arr[i]];
				else
					str += "\"" + obj[arr[i]] + "\"";
				//如果该键的值不是数字，转成字符串
			}
			else
				str += this.stringify(obj[arr[i]]);
			//如果该键的值是对象类型，递归调用这个函数处理这个对象
			if ((i + 1) < arr.length)
				str += ",";
			//如果该键不在对象的末尾，往字符串后添加","来分隔
			i++;
		}
		str += "]";	
		//结束对象
	};
	return str;
};
JSON.parse = function(str) {
	str = str.toString();
	eval("var ret = " + str);
	return ret;
	//直接使用eval方法来解析对象
};