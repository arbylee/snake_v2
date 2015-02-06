$(function() {
  var drawWorld = function(context, height, width) {
    context.fillStyle = "#FFF";
    context.fillRect(0, 0, width, height);
    context.fill();
    context.strokeStyle = "#000";
    context.strokeRect(0, 0, width, height);
  }

  var main = function(context, height, width) {
    drawWorld(context, height, width);
  }

  var init = function() {
    var canvas, context, height, width;
    canvas = $('#snake_canvas');
    context = canvas[0].getContext('2d');
    height = canvas.height();
    width = canvas.width();
    main(context, height, width);
  };

  init();
})
