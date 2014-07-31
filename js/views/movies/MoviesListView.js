define([
    'jquery',
    'jqueyStarRating',
    'underscore',
    'backbone',
    'text!templates/movies/moviesListTemplate.html'
], function($, jqueyStarRating, _, Backbone, moviesListTemplate) {

    var MoviesListView = Backbone.View.extend({
        el: $("#movies-list"),
        events: {

        },

        initialize: function(options) {
            this.moviesCollection = options.moviesCollection;
        },

        render: function() {
            var instance = this;

            //Sync Data
            this.moviesCollection.fetch();

            //Caching the recent movies values
            var movies = this.moviesCollection.models,
                template = _.template(moviesListTemplate, {
                    data: movies
                });

            instance.$el.html(template);

            var ratingNode = instance.$el.find('.rating');
            ratingNode.rating();
            this.show();
        },

        hide: function() {
            this.$el.hide();
        },

        show: function() {
            this.$el.show();
        }
    });

    return MoviesListView;
});