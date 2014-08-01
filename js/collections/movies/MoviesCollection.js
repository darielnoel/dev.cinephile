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
            var moviesCollection = this,
                foundedMovies;
                
            foundedMovies = moviesCollection.filter(function(item){
                var isfounded = false;
                if(item.get('actorCollection').length){
                    isfounded = _.contains(item.get('actorCollection'), actorID);
                }
                 
                 return isfounded;
            });

            return foundedMovies;
        },

        getByNameSubstr: function(NameSubstr){
            var moviesCollection = this,
                foundedMovies;
            
            if(!NameSubstr){
                foundedMovies = moviesCollection.models;
            } else{
                foundedMovies = moviesCollection.filter(function(item){
                    return item.get('name').indexOf(NameSubstr) >= 0;
                });                
            }    
            return foundedMovies;
        }

    });

    return MoviesCollection;

});