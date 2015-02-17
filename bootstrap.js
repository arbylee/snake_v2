require.config({
    baseUrl: '',
    paths: {
        jquery: 'node_modules/jquery/dist/jquery.min',
        underscore: 'node_modules/underscore/underscore-min',
    }
});

require(['app'], function(app) {
  app.init();
});
