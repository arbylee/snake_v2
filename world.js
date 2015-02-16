define([], function(){
  var newWorld = function(ui, width, height){
    var draw = function(){
      ui.drawBox(width, height);
    };
    return {
      draw: draw,
      width: width,
      height: height
    };
  };
  return {new: newWorld};
});
