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
   }).catch(err => {
    console.log(err);
    if (err.code == 101)
      alert("Username or password incorrect.");
   });
}
