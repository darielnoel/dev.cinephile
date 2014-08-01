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
    'views/actors/ActorDetailView',
    'views/app/AppSearchBoxView',
    'views/search/SearchMoviesView',
    'views/search/SearchActorsView',

], function($, _, Backbone, MoviesCollection, ActorsCollection, RecentMoviesView, MoviesListView, MovieEditView, MovieDetailView, ActorsListView, ActorEditView, ActorDetailView, AppSearchBoxView, SearchMoviesView, SearchActorsView) {

    //-------------------------------------------------------
    // App Namespaces
    //-------------------------------------------------------

    var App = {
        Router: {},
        Views: {
            'RecentMoviesView': RecentMoviesView,
            'MoviesListView': MoviesListView,
            'MovieEditView': MovieEditView,
            'MovieDetailView': MovieDetailView,
            'ActorsListView': ActorsListView,
            'ActorEditView': ActorEditView,
            'ActorDetailView': ActorDetailView,
            'SearchMoviesView': SearchMoviesView,
            'SearchActorsView': SearchActorsView,

        },
        Config: {},
        Instances: {
            views: {}
        }
    }

    //-------------------------------------------------------
    // Backbone Router Definition
    //-------------------------------------------------------

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
            "search/:query": "searchAction",
        }
    });

    /**
     * The starting point function
     * @method initialize
     * @return
     */
    var initialize = function() {

       var appRouter = new App.Router(),
            movies = new MoviesCollection(),
            actors = new ActorsCollection();

        App.Instances.views.AppSearchBoxView = new AppSearchBoxView({
            router: appRouter
        });

        App.Instances.views.AppSearchBoxView.render();

        //-------------------------------------------------------
        // Actions Handles
        //-------------------------------------------------------

        appRouter.on('route:homeAction', function() {
            showViewHelper('RecentMoviesView', {
                moviesCollection: movies
            });
        });

        appRouter.on('route:moviesAction', function() {
            showViewHelper('MoviesListView', {
                moviesCollection: movies,
                actorsCollection: actors
            });
        });

        appRouter.on('route:moviesEditAction', function(options) {
            showViewHelper('MovieEditView', {
                id: options,
                moviesCollection: movies,
                actorsCollection: actors,
                router: appRouter
            });
        });

        appRouter.on('route:moviesNewAction', function(options) {
            showViewHelper('MovieEditView', {
                moviesCollection: movies,
                actorsCollection: actors,
                router: appRouter
            });
        });

        appRouter.on('route:moviesDetailAction', function(options) {
            showViewHelper('MovieDetailView', {
                id: options,
                moviesCollection: movies,
                actorsCollection: actors,
                router: appRouter
            });
        });

        appRouter.on('route:actorsAction', function() {
            showViewHelper('ActorsListView', {
                actorsCollection: actors
            });
        });

        appRouter.on('route:actorsEditAction', function(options) {
            showViewHelper('ActorEditView', {
                id: options,
                moviesCollection: movies,
                actorsCollection: actors,
                router: appRouter
            });
        });

        appRouter.on('route:actorsNewAction', function(options) {
            showViewHelper('ActorEditView', {
                moviesCollection: movies,
                actorsCollection: actors,
                router: appRouter
            });
        });

        appRouter.on('route:actorsDetailAction', function(options) {
            showViewHelper('ActorDetailView', {
                id: options,
                moviesCollection: movies,
                actorsCollection: actors,
                router: appRouter
            });
        });

        appRouter.on('route:searchAction', function(options) {

            var queryArray = options.split('&'),
                category = queryArray[0];
            query = queryArray[1],
            openViewID = 'SearchMoviesView';

            if (category === 'actors') {
                openViewID = 'SearchActorsView';
            }

            showViewHelper(openViewID, {
                query: query,
                moviesCollection: movies,
                actorsCollection: actors,
                router: appRouter
            });

            App.Instances.views.AppSearchBoxView.syncUI({
                query: query,
                selected: category
            });
        });


        Backbone.history.start();
    };

    /**
     * Allow swich between Views
     * @method showViewHelper
     * @param {} viewID
     * @param {} options
     * @return
     */
    var showViewHelper = function(viewID, options) {
        var viewInstances = App.Instances.views;
        if (!viewInstances[viewID]) {
            viewInstances[viewID] = new App.Views[viewID](options);
        }

        _.each(viewInstances, function(value, key) {
            if (key !== viewID && key !== 'AppSearchBoxView') {
                value.hide();
            }
        })

        viewInstances[viewID].render(options);
    };

    var setupFixtures = function(){

    }

    return {
        initialize: initialize
    };
});
