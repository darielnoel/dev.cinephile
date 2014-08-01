require.config({
    paths: {
        jquery: 'libs/jquery/jquery-min',
        jquerySerialize: 'libs/jquery/jquery-serialize',
        jqueyStarRating: 'libs/jquery/star-rating',
        bootstrap: 'http://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.2.0/js/bootstrap.min',
        underscore: 'libs/underscore/underscore-min',
        backbone: 'libs/backbone/backbone-min',
        backboneLocalStorage: 'libs/backbone/backbone.localStorage-min',
        templates: '../templates'
    }

});

require([
    // Load our app module and pass it to our definition function
    'app',

], function(App) {
    // The "app" dependency is passed in as "App"
    // Again, the other dependencies passed in are not "AMD" therefore don't pass a parameter to this function
    App.initialize();
});