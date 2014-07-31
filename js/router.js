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
    'views/movies/MovieDetailView',
    'views/actors/ActorsListView',
    'views/actors/ActorEditView',
    'views/actors/ActorDetailView'

], function($, _, Backbone, MoviesCollection, ActorsCollection, RecentMoviesView, MoviesListView, MovieEditView, MovieDetailView, ActorsListView, ActorEditView, ActorDetailView) {

    var App = {
        Router: {},
        Views: {
            'RecentMoviesView': RecentMoviesView,
            'MoviesListView': MoviesListView,
            'MovieEditView': MovieEditView,
            'MovieDetailView': MovieDetailView,
            'ActorsListView': ActorsListView,
            'ActorEditView': ActorEditView,
            'ActorDetailView': ActorDetailView
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
            "movies/detail/:id": "moviesDetailAction",
            "actors": "actorsAction",
            "actors/edit/:id": "actorsEditAction",
            "actors/new": "actorsNewAction",
            "actors/detail/:id": "actorsDetailAction",
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

        app_router.on('route:moviesDetailAction', function(options) {
            showViewHelper('MovieDetailView', {
                id: options,
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

        app_router.on('route:actorsDetailAction', function(options) {
            showViewHelper('ActorDetailView', {
                id: options,
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