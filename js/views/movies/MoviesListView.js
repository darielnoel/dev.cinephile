define([
    'jquery',
    'jqueyStarRating',
    'underscore',
    'backbone',
    'text!templates/movies/moviesListTemplate.html'
], function($, jqueyStarRating, _, Backbone, moviesListTemplate) {

    //-------------------------------------------------------
    // Movie List View
    //-------------------------------------------------------

    var MoviesListView = Backbone.View.extend({
        el: $("#movies-list"),
        events: {

        },

        /**
         * Description
         * @method initialize
         * @param {} options
         * @return
         */
        initialize: function(options) {
            this.moviesCollection = options.moviesCollection;
        },

        /**
         * Description
         * @method render
         * @return
         */
        render: function() {
            //Sync Data
            this.moviesCollection.fetch();

            var instance = this,
                movies = instance.moviesCollection.models,
                template = _.template(moviesListTemplate, {
                    data: movies
                }),
                viewSrcNode = instance.$el,
                ratingNode;

            viewSrcNode.html(template);

            ratingNode = viewSrcNode.find('.rating');
            ratingNode.rating();
            instance.show();
        },

        /**
         * Description
         * @method hide
         * @return
         */
        hide: function() {
            this.$el.hide();
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

    return MoviesListView;
});
