define([
    'jquery',
    'jquerySerialize',
    'jqueyStarRating',
    'underscore',
    'backbone',
    'models/movie/MovieModel',
    'text!templates/movies/movieDetailTemplate.html',
    'text!templates/movies/movieDetailActorsListTemplate.html'
], function($, jquerySerialize, jqueyStarRating, _, Backbone, MovieModel, movieDetailTemplate, movieDetailActorsListTemplate) {

    //-------------------------------------------------------
    // Movie Detail View
    //-------------------------------------------------------

    var MovieDetailView = Backbone.View.extend({
        el: $("#movie-detail"),
        events: {
            'click .cancel': 'cancelItem',
        },
        model: {},

        /**
         * Description
         * @method initialize
         * @param {} options
         * @return
         */
        initialize: function(options) {
            var instance = this;

            instance.moviesCollection = options.moviesCollection;
            instance.actorsCollection = options.actorsCollection;
            instance.router = options.router;
        },

        /**
         * Description
         * @method render
         * @param {} options
         * @return
         */
        render: function(options) {
            var instance = this,
                template,
                movie,
                id = options.id;

            instance.moviesCollection.fetch();

            if (id) {

                //Caching the recent movies values
                movie = instance.moviesCollection.get(id);
                instance.model = movie;

                instance.model.fetch({

                    success: function(data) {
                        var template = _.template(movieDetailTemplate, {
                                data: data
                            }),
                            viewSrcNode = instance.$el,
                            movieActors = [],
                            templateActors;

                        viewSrcNode.html(template);

                        var ratingNode = viewSrcNode.find('.rating');
                        ratingNode.rating();

                        ratingNode.on('rating.change', function(event, value, caption) {
                            instance.model.setRating(value);
                            instance.model.save();
                            ratingNode.rating('update', instance.model.get('rating'));
                        });

                        instance.actorsCollection.fetch();
                        _.each(instance.model.get('actorCollection'), function(item) {
                            movieActors.push(instance.actorsCollection.get(item));
                        });

                        templateActors = _.template(movieDetailActorsListTemplate, {
                            data: movieActors
                        });

                        viewSrcNode.find('.movie-actor-list').html(templateActors);

                    }
                });
            }

            instance.show();
        },

        /**
         * Back to the movies Views
         * @method cancelItem
         * @param {} e
         * @return
         */
        cancelItem: function(e) {
            this.router.navigate('movies', {
                trigger: true
            });
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

    return MovieDetailView;

});
