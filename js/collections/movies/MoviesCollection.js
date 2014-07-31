define([
    'underscore',
    'backboneLocalStorage',
    'backbone',
    'models/movie/MovieModel'
], function(_, backboneLocalStorage, Backbone, MovieModel) {

    //Movies Model Collection
    MoviesCollection = Backbone.Collection.extend({
        model: MovieModel,
        localStorage: new Backbone.LocalStorage("bb-movies"),

        //Return the last 10 added movies 
        recents: function() {
            return this.models.slice(-10);
        },

        getMoviesByActor: function(actorID){
            
        }

    });

    return MoviesCollection;

});