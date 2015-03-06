define([], function(){
  var newWorld = function(ui, width, height){
    var snakes = [];
    var food = [];
    var draw = function(){
      ui.drawBox(width, height);
      _.each(snakes, function(snake){
        snake.draw();
      });
      _.each(food, function(foodPiece){
        foodPiece.draw();
      });
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

    var snakeCount = function(){
      return snakes.length;
    };

    var foodCount = function() {
      return food.length;
    };

    var addFood = function(foodPiece){
      food.push(foodPiece);
    };

    var randomFreeLocation = function(){
      var randomX = Math.floor(Math.random() * (width-1));
      var randomY = Math.floor(Math.random() * (height-1));
      if(!spaceIsOccupied(randomX, randomY)){
        return {x: randomX, y: randomY};
      } else {
        return randomFreeLocation();
      };
    };

    var spaceIsOccupied = function(x, y){
      var snakeCollision = _.some(snakes, function(snake){
        return _.some(snake.body(), function(bodyPart){
          return bodyPart.x == x && bodyPart.y == y;
        });
      });
      if(snakeCollision){
        return true;
      };

      var foodCollision = _.some(food, function(foodPiece){
        return foodPiece.x == x && foodPiece.y;
      });
      if(foodCollision){
        return true;
      };

      return false;
    };

    var feedSnakes = function() {
      _.each(snakes, function(snake){
        var foundFood = _.some(food, function(foodPiece, index){
          if(foodPiece.x == snake.head().x && foodPiece.y == snake.head().y){
            food.splice(index, 1);
            return true;
          };
        });
        if(foundFood){
          snake.grow();
        };
      });
    };

    return {
      draw: draw,
      width: width,
      height: height,
      addSnake: addSnake,
      snakeCollidedWithWall: snakeCollidedWithWall,
      clearSnakes: clearSnakes,
      snakeCount: snakeCount,
      foodCount: foodCount,
      addFood: addFood,
      randomFreeLocation: randomFreeLocation,
      feedSnakes: feedSnakes
    };
  };
  return {
    new: newWorld
  };
});
