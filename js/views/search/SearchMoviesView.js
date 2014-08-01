define([
    'jquery',
    'jqueyStarRating',
    'underscore',
    'backbone',
    'text!templates/search/searchMoviesListTemplate.html',
], function($, jqueyStarRating, _, Backbone, searchMoviesListTemplate) {

    var SearchMoviesView = Backbone.View.extend({
        el: $("#search-movies-list"),
        events: {

        },

        initialize: function(options) {
            this.moviesCollection = options.moviesCollection;
        },

        render: function(options) {
            //Sync Data
            this.moviesCollection.fetch();

            var instance = this,
                movies = this.moviesCollection.getByNameSubstr(options.query),
                template = _.template(searchMoviesListTemplate, {
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

    return SearchMoviesView;
});