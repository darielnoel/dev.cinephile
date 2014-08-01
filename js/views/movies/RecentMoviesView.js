define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/movies/moviesThumbailsTemplate.html'
], function($, _, Backbone, moviesThumbailsTemplate) {

    //-------------------------------------------------------
    // Recent Movies View
    //-------------------------------------------------------

    var RecentMoviesView = Backbone.View.extend({
        el: $("#recent-movies"),
        events: {

        },

        /**
         * Description
         * @method initialize
         * @param {} options
         * @return
         */
        initialize: function(options) {
            var instance = this;

            instance.moviesCollection = options.moviesCollection;


        },

        /**
         * Description
         * @method render
         * @return
         */
        render: function() {
            this.moviesCollection.fetch();

            var instance = this,
                recentMovies = instance.moviesCollection.recents(),
                template = _.template(moviesThumbailsTemplate, {
                    data: recentMovies
                });

            instance.$el.html(template);
            instance.show();
        },

        /**
         * Description
         * @method hide
         * @return
         */
        hide: function() {
            $(this.el).hide();
        },

        /**
         * Description
         * @method show
         * @return
         */
        show: function() {
            this.$el.show();
        }
    });

    return RecentMoviesView;
});
