// Filename: router.js
define([
    'jquery',
    'underscore',
    'backbone',
    'collections/movies/MoviesCollection',
    'collections/actors/ActorsCollection',
    'views/movies/RecentMoviesView',
    'views/movies/MoviesListView',
    'views/movies/MovieEditView',
    'views/actors/ActorsListView',
    'views/actors/ActorEditView'


], function($, _, Backbone, MoviesCollection, ActorsCollection, RecentMoviesView, MoviesListView, MovieEditView, ActorsListView, ActorEditView) {

    var App = {
        Router: {},
        Views: {
            'RecentMoviesView': RecentMoviesView,
            'MoviesListView': MoviesListView,
            'MovieEditView': MovieEditView,
            'ActorsListView': ActorsListView,
            'ActorEditView': ActorEditView
        },
        Config: {},
        Instances: {
            views: {}
        }
    }

    App.Router = Backbone.Router.extend({
        routes: {
            "": "homeAction",
            "movies": "moviesAction",
            "movies/edit/:id": "moviesEditAction",
            "movies/new": "moviesNewAction",
            "actors": "actorsAction",
            "actors/edit/:id": "actorsEditAction",
            "actors/new": "actorsNewAction",
        }
    });

    var initialize = function() {

        var app_router = new App.Router(),
            movies = new MoviesCollection(),
            actors = new ActorsCollection();

        app_router.on('route:homeAction', function() {
            showViewHelper('RecentMoviesView', {
                moviesCollection: movies
            });
        });

        app_router.on('route:moviesAction', function() {
            showViewHelper('MoviesListView', {
                moviesCollection: movies,
                actorsCollection: actors
            });
        });

        app_router.on('route:moviesEditAction', function(options) {
            showViewHelper('MovieEditView', {
                id: options,
                moviesCollection: movies,
                actorsCollection: actors,
                router: app_router
            });
        });

        app_router.on('route:moviesNewAction', function(options) {
            showViewHelper('MovieEditView', {
                moviesCollection: movies,
                actorsCollection: actors,
                router: app_router
            });
        });

        app_router.on('route:actorsAction', function() {
            showViewHelper('ActorsListView', {
                actorsCollection: actors
            });
        });

        app_router.on('route:actorsEditAction', function(options) {
            showViewHelper('ActorEditView', {
                id: options,
                moviesCollection: movies,
                actorsCollection: actors,
                router: app_router
            });
        });

        app_router.on('route:actorsNewAction', function(options) {
            showViewHelper('ActorEditView', {
                moviesCollection: movies,
                actorsCollection: actors,
                router: app_router
            });
        });

        Backbone.history.start();
    };

    var showViewHelper = function(viewID, options) {
        var viewInstances = App.Instances.views;
        if (!viewInstances[viewID]) {
            viewInstances[viewID] = new App.Views[viewID](options);
        }

        _.each(viewInstances, function(value, key) {
            if (key !== viewID && key !== 'main') {
                value.hide();
            }
        })

        viewInstances[viewID].render(options);
    };

    return {
        initialize: initialize
    };
});