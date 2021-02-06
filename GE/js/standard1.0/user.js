if (typeof Bmob == "undefined")
  alert("Login error : Not find the package");
function login()
{
  Bmob.initialize("f361bc86904be7cf", "011988");
  var username = document.getElementById("login-username").value;
  var password = document.getElementById("login-password").value;
  Bmob.User.login(username,password).then(res => {
    console.log(res);
    var result = JSON.stringify(res);
    sessionStorage.setItem("userinfo",result);
    db.newtable("info",1,"user","id","console.log");
    db.add("info",1,"user",{"id":1,"info":result},"console.log");
    sessionStorage.setItem("loginstatus","ok");
   }).catch(err => {
    console.log(err);
    if (err.code == 101)
      alert("Username or password incorrect.");
   });
}
function reg()
{
  Bmob.initialize("f361bc86904be7cf", "011988");
  var username = document.getElementById("username").value;
  var password = document.getElementById("password").value;
  if (password != document.getElementById("password2").value)
  {
    alert("The password does not match the verification password");
    return;
  }
  if (username.length > 16 || password.length > 16 || password.length < 8 || username.length < 8)
  {
    alert("The username or password should be between 8 and 16 letters long");
    return;
  }
  if (username.indexOf(password) != -1 || password.indexOf(username) != -1)
  {
    alert("The user name should not contain a password, or the user name should be part of the password");
    return;
  }
  var arr = [123,456,789,"abc","qwerty","ABC","QWERTY",111,222,333,444,555,666,777,888,999,987,654,321,520,1314,"password","Password","apple","Apple","PASSWORD","APPLE","admin","Admin","ADMIN",314,15926,"qazwsx","QAZWSX","meiyoumima","Hello World","iloveyou","Iloveyou","ILOVEYOU","def","ghi","xyz","cn","sh","aaa","bbb","ccc","ddd","zzz","xxx","yyy","a1b2c3","A1B2C3","adobe","microsoft","ADOBE","MICROSOFT","letmein","LETMEIN","photoshop","PHOTOSHOP","dog","cat","DOG","CAT","MONKEY","monkey","shadow","SHADOW","sun","SUN","princess","PRINCESS","azerty","AZERTY",000,"trust","TRUST","NO","no","YES","yes","hello","Hello","HELLO",2019,2020,2021,2000,1999,1920,1980,147258369,"a1b2","c3d4","e5f6","t5r4","e3w2","asdfgh","zxcvbn","mnbvcx","lkjhgf","poiuyt","POIUYT","LKJHGF","MNBVCX","ZXCVBN","qq","wechat","ali","tencent","bilibili","youku","netease","baidu","google","youtube","facebook","...","mmm","java","JAVA","python","PYTHON","JS","js","SB","sb","3Q","3q","thank","THANK","YOU","you","250","Script","script","SCRIPT","AJAX","ajax","xml","XML","XHR","xhr","response","Response","RESPONSE","request","REQUEST","go","GO","Go","earth","Earth","EARTH","Star","star","STAR","US","us","CP","Cp","cp","uk","UK","Uk","CN","cn","Cn","PRC","prc","Prc","window","WINDOW","INC","inc","mac","MAC","IOS","ios","Bing","bing","BING","Office","OFFICE","office"]
  console.log(arr);
  var i = 0;
  while (i != arr.length)
  {
    if (password.indexOf(arr[i]) != -1)
    {
        alert("The password strength is too low\nThe password contains the keyword: " + arr[i]);
        return;
    }
    i++;
  }
  let userinfo = {};
  userinfo.username = username;
  userinfo.password = password;
  userinfo.phone = 0;
  userinfo.email = "example@outlook.com";
  Bmob.User.register(userinfo).then(res => {
      console.log(res);
      var result = JSON.stringify(res);
      sessionStorage.setItem("userinfo",result);
      db.newtable("info",1,"user","id","console.log");
      db.add("info",1,"user",{"id":1,"info":result},"abc");
    
  }).catch(err => {
      console.log(err);
      if (err.code == 400)
        alert("Regerist error:Bad request");
      if (err.code == 202)
        alert("The user name repeats");
  });
}
function abc(dat)
{
  console.log(dat);
  location.href = "https://cdn2021.github.io/GE/game/pre0.01";
}
