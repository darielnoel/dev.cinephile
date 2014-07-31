define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/movies/moviesThumbailsTemplate.html'
], function($, _, Backbone, moviesThumbailsTemplate) {

    var RecentMoviesView = Backbone.View.extend({
        el: $("#recent-movies"),
        events: {

        },

        initialize: function(options) {
            this.moviesCollection = options.moviesCollection;
            this.moviesCollection.fetch();

        },

        render: function() {
            var instance = this;

            //Caching the recent movies values
            var recentMovies = this.moviesCollection.recents(),
                template = _.template(moviesThumbailsTemplate, {
                    data: recentMovies
                });

            instance.$el.html(template);
            this.show();
        },

        hide: function() {
            $(this.el).hide();
        },

        show: function() {
            this.$el.show();
        }
    });

    return RecentMoviesView;
});