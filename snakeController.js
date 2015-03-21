define(['snake'], function(Snake){
  var snake;
  var newSnakeController = function(up, right, down, left){
    var handleKeys = function(event){
      if(event.keyCode == left){
        snake.changeDirection(Snake.DIRECTIONS.LEFT);
      } else if(event.keyCode == up){
        snake.changeDirection(Snake.DIRECTIONS.UP);
      } else if(event.keyCode == right){
        snake.changeDirection(Snake.DIRECTIONS.RIGHT);
      } else if(event.keyCode == down){
        snake.changeDirection(Snake.DIRECTIONS.DOWN);
      };
    };

    var setSnake = function(newSnake){
      snake = newSnake;
    }
    return {
      handleKeys: handleKeys,
      setSnake: setSnake
    }
  }

  return {
    new: newSnakeController
  }
});
