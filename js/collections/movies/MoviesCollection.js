define([
    'underscore',
    'backboneLocalStorage',
    'backbone',
    'models/movie/MovieModel'
], function(_, backboneLocalStorage, Backbone, MovieModel) {

    //-------------------------------------------------------
    // Movies Models Collection
    //-------------------------------------------------------

    MoviesCollection = Backbone.Collection.extend({
        model: MovieModel,
        localStorage: new Backbone.LocalStorage("bb-movies"),

        /**
         * Return the last 10 added movies
         * @method recents
         * @return CallExpression
         */
        recents: function() {
            return this.models.slice(-10);
        },

        /**
         * The movies which the specified actor is present
         * @method getMoviesByActor
         * @param {} actorID
         * @return foundedMovies
         */
        getMoviesByActor: function(actorID) {
            var moviesCollection = this,
                foundedMovies;

            foundedMovies = moviesCollection.filter(function(item) {
                var isfounded = false;
                if (item.get('actorCollection').length) {
                    isfounded = _.contains(item.get('actorCollection'), actorID);
                }

                return isfounded;
            });

            return foundedMovies;
        },

        /**
         * Return the Models which name match with NameSubstr
         * @method getByNameSubstr
         * @param {} NameSubstr
         * @return foundedMovies
         */
        getByNameSubstr: function(NameSubstr) {
            var moviesCollection = this,
                foundedMovies;

            if (!NameSubstr) {
                foundedMovies = moviesCollection.models;
            } else {
                foundedMovies = moviesCollection.filter(function(item) {
                    return item.get('name').indexOf(NameSubstr) >= 0;
                });
            }
            return foundedMovies;
        },

        /**
         * Description
         * @method getRelatesMovies
         * @param {} movieID
         * @return 
         */
        getRelatesMovies: function(movieID){
            var instance = this,
                inspectedMovieModel = instance.get(movieID),
                relatesMovies;

            relatesMovies = instance.filter(function(item) {
                
                if(item.get('id')!==movieID){
                    //Same actors
                    var matchValues = [];
                    matchValues = _.intersection(inspectedMovieModel.get('actorCollection'),item.get('actorCollection'));
                    
                    if(matchValues.length > 0){
                        return true;
                    }

                    //Same Generes
                    matchValues = _.intersection(inspectedMovieModel.get('genere'),item.get('genere'));
                    if(matchValues.length > 0){
                        return true;
                    }                      
                }
             
                
                return false;
            });

            console.log(relatesMovies);
            return relatesMovies;

        }

    });

    return MoviesCollection;

});
