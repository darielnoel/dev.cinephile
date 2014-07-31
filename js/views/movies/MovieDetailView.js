define([
    'jquery',
    'jquerySerialize',
    'underscore',
    'backbone',
    'models/movie/MovieModel',
    'text!templates/movies/movieDetailTemplate.html',
    'text!templates/movies/movieDetailActorsListTemplate.html'
], function($, jquerySerialize, _, Backbone, MovieModel, movieDetailTemplate, movieDetailActorsListTemplate) {

    var MovieDetailView = Backbone.View.extend({
        el: $("#movie-detail"),
        events: {
            'click .cancel': 'cancelItem',
        },
        model: {},

        initialize: function(options) {
            this.moviesCollection = options.moviesCollection;
            this.actorsCollection = options.actorsCollection;
            this.router = options.router;
        },

        render: function(options) {
            var instance = this,
                template,
                movie,
                id = options.id;
            this.moviesCollection.fetch();

            if (id) {
                //Caching the recent movies values
                movie = instance.moviesCollection.get(id);
                this.model = movie;

                instance.model.fetch({
                    success: function(data) {
                        var template = _.template(movieDetailTemplate, {
                            data: data
                        });
                        instance.$el.html(template);

                        instance.actorsCollection.fetch();
                        var movieActors = [];
                        _.each(instance.model.get('actorCollection'), function(item) {
                            movieActors.push(instance.actorsCollection.get(item));
                        });

                        var templateActors = _.template(movieDetailActorsListTemplate, {
                            data: movieActors
                        });

                        instance.$el.find('.movie-actor-list').html(templateActors);

                    }
                });
            }

            this.show();
        },

        cancelItem: function(e) {
            this.router.navigate('movies', {
                trigger: true
            });
        },

        hide: function() {
            this.$el.hide();
        },

        show: function() {
            this.$el.show();
        }
    });

    return MovieDetailView;

});