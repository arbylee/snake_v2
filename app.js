define(['jquery', 'underscore', 'snake', 'world', 'ui', 'snakeController'], function($, _, Snake, World, UI, SnakeController){
  var gameTickLength = 1000/6;

  var restart = function(ui, world) {
    var snakeX = world.width / 2,
        snakeY = world.width / 2;
    var snake = Snake.new(ui, world, snakeX, snakeY);
    main(ui, snake, world);
  };

  var main = function(ui, snake, world) {
    var alive = true;
    var gameLoop = function(){
      if(alive) {
        world.draw();
        snake.move();
        snake.draw();
        if(snake.dead()) {
          alive = false;
        };
        intervalId = setTimeout(gameLoop, gameTickLength);
      } else {
        restart(ui, world);
      }
    };
    intervalId = setTimeout(gameLoop, gameTickLength);
  };

  var init = function() {
    var canvas,
        context,
        pixelSize = 10;
    canvas = $('#snake_canvas');
    context = canvas[0].getContext('2d');
    var ui = UI.new(context, pixelSize);
    var gameHeight = canvas.height() / pixelSize
    var gameWidth = canvas.width() / pixelSize
    var world = World.new(ui, gameWidth, gameHeight);

    var snakeX = world.width / 2;
    var snakeY = world.height / 2;
    var snake = Snake.new(ui, world, snakeX, snakeY);
    var snakeController = SnakeController.new(snake);
    canvas.keydown(snakeController.handleKeys);
    main(ui, snake, world);
  };

  return {init: init}
});
