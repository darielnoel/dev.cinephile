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
         * @param {} options
         * @return
         */
        render: function(options) {
            //Sync Data
            this.moviesCollection.fetch();

            var instance = this,
                movies = instance.moviesCollection.getByNameSubstr(options.query),
                template = _.template(searchMoviesListTemplate, {
                    data: movies
                }),
                ratingNode,
                viewSrcNode = instance.$el;

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

    return SearchMoviesView;
});
