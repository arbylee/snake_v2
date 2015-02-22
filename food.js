define([], function(){
  var newFood = function(ui, x, y){
    var draw = function() {
      ui.drawPixel(x, y);
    };
    return {
      x: x,
      y: y,
      draw: draw
    };
  };
  return {new: newFood};
});
