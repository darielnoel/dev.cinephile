define([
    'jquery',
    'jqueyStarRating',
    'jquerySerialize',
    'underscore',
    'backbone',
    'models/actor/ActorModel',
    'text!templates/actors/actorDetailTemplate.html',
    'text!templates/actors/actorDetailMoviesListTemplate.html',

], function($, jqueyStarRating, jquerySerialize, _, Backbone, ActorModel, actorDetailTemplate, actorDetailMoviesListTemplate) {

    //-------------------------------------------------------
    // Actor Edit View
    //-------------------------------------------------------

    var ActorDetailView = Backbone.View.extend({
        el: $("#actor-edit"),

        events: {
            'click .cancel': 'cancelItem'
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
                actor,
                id = options.id;

            instance.actorsCollection.fetch();

            if (id) {
                //Caching the recent actors values
                actor = instance.actorsCollection.get(id);
                instance.model = actor;

                instance.model.fetch({

                    success: function(data) {
                        var template = _.template(actorDetailTemplate, {
                                data: data
                            }),
                            movieListTemplate,
                            moviesByActor,
                            ratingNode,
                            viewSrcNode = instance.$el;

                        viewSrcNode.html(template);

                        instance.moviesCollection.fetch();

                        moviesByActor = instance.moviesCollection.getMoviesByActor(id);

                        movieListTemplate = _.template(actorDetailMoviesListTemplate, {
                            data: moviesByActor
                        });

                        viewSrcNode.find('.actor-detail-movie-list').html(movieListTemplate);

                        ratingNode = viewSrcNode.find('.actor-detail-movie-list .rating');
                        ratingNode.rating();

                    }
                });
            }

            instance.show();
        },

        /**
         * Back to ActorsListView
         * @method cancelItem
         * @param {} e
         * @return
         */
        cancelItem: function(e) {
            this.router.navigate('actors', {
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

    return ActorDetailView;

});
