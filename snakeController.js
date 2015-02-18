define(['snake'], function(Snake){
  var newSnakeController = function(snake){
    var handleKeys = function(event){
      var letterA = 65,
          letterW = 87,
          letterD = 68,
          letterS = 83;
      if(event.keyCode == letterA){
        snake.changeDirection(Snake.DIRECTIONS.LEFT);
      } else if(event.keyCode == letterW){
        snake.changeDirection(Snake.DIRECTIONS.UP);
      } else if(event.keyCode == letterD){
        snake.changeDirection(Snake.DIRECTIONS.RIGHT);
      } else if(event.keyCode == letterS){
        snake.changeDirection(Snake.DIRECTIONS.DOWN);
      };
    };
    return {handleKeys: handleKeys};
  };
  return {new: newSnakeController};
});
