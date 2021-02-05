if (typeof Bmob == "undefined")
  alert("Login error : Not find the package");
function login()
{
  Bmob.initialize("f361bc86904be7cf", "011988");
  var username = document.getElementById("login-username").value;
  var password = document.getElementById("login-password").value;
  Bmob.User.login(username,password).then(res => {
    console.log(res);
   }).catch(err => {
    console.log(err);
   });
}
