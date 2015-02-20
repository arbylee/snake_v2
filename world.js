define([], function(){
  var newWorld = function(ui, width, height){
    var snakes = [];
    var draw = function(){
      ui.drawBox(width, height);
    };

    var addSnake = function(snake, x, y){
      snakes.push(snake);
      snake.setLocation(x, y);
    };

    var snakeCollidedWithWall = function(snake){
      var head = snake.head();
      if (head.x >= width ||
          head.x < 0 ||
          head.y >= height ||
          head.y < 0) {
        return true;
      };
    };

    var clearSnakes = function() {
      snakes = [];
    };

    return {
      draw: draw,
      width: width,
      height: height,
      addSnake: addSnake,
      snakeCollidedWithWall: snakeCollidedWithWall,
      clearSnakes: clearSnakes
    };
  };
  return {
    new: newWorld
  };
});
