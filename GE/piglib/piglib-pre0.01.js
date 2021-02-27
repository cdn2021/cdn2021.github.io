var $ = function (...argu) 
{
  if (!argu.length)
    throw("No one parameter was passed in");
  var t = argu[0];
  if (t == "player")
    return $.player(argu);
  if (t == "world")
    return $.world(argu);
  if (t == "version")
    return {version:"pre0.01"};
  if (t == "document")
  {
    let o = window.open("https://cdn2021.github.io/GE/piglib/document");
    return {"url":"https://cdn2021.github.io/GE/piglib/document","object":o};
  }
  throw("The argument passed in is wrong");
};
$.world = function (...argu) {
  if (argu[0].length == 1)
    return $.world.default;
  else
  {
    let result = $.world.default[argu[0][1]];
    if (typeof result == "function")
      return $.world.default[result]();
    return $.world.default[result];
  }
};
$.player = function (...argu) {
  if (argu[0].length == 1)
    return $.player.default;
  else
  {
    let result = $.world.default[argu[0][1]];
    if (typeof result == "function")
      return $.world.default[result]();
    return $.player.default[result];
  }
};
$.player.default = {};
$.player.default.getPlayerCoordinate = function () {
  let x_axis = localStorage.getItem("camera-x");
  let y_axis = localStorage.getItem("camera-y");
  let z_axis = localStorage.getItem("camera-z");
  if (x_axis == null || y_axis == null || z_axis == null) 
    throw("The player's data is not initialized");
  return {x:x_axis,y:y_axis,z:z_axis};
};
$.player.default.setPlayerCoordinate = function (...argu) {
  if (argu.length == 0)
    throw("No arguments were passed");
  if (typeof argu[0].x != "undefined")
    localStorage.setItem("camera-x",argu[0].x);
  if (typeof argu[0].y != "undefined")
    localStorage.setItem("camera-y",argu[0].y);
  if (typeof argu[0].z != "undefined")
    localStorage.setItem("camera-z",argu[0].z);
  return $.player.default.getPlayerCoordinare();
};
$.version = "pre0.01";
var piglib = $;
