define([
    'jquery',
    'jquerySerialize',
    'underscore',
    'backbone',
    'models/actor/ActorModel',
    'text!templates/actors/actorDetailTemplate.html',
    'text!templates/actors/actorDetailMoviesListTemplate.html',
    
], function($, jquerySerialize, _, Backbone, ActorModel, actorDetailTemplate, actorDetailMoviesListTemplate) {

    var ActorDetailView = Backbone.View.extend({
        el: $("#actor-edit"),
        events: {
            'click .cancel': 'cancelItem'
        },
        model: {},

        initialize: function(options) {
            var instance = this;

            instance.moviesCollection = options.moviesCollection;
            instance.actorsCollection = options.actorsCollection;
            instance.router = options.router;
        },

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
                            moviesByActor;
                        
                        instance.$el.html(template);

                        instance.moviesCollection.fetch();

                        moviesByActor = instance.moviesCollection.getMoviesByActor(id); 

                        movieListTemplate = _.template(actorDetailMoviesListTemplate, {
                                data: moviesByActor
                        });

                        instance.$el.find('.actor-detail-movie-list').html(movieListTemplate);
                        
                    }
                });
            } 

            instance.show();
        },

        cancelItem: function(e) {
            this.router.navigate('actors', {
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

    return ActorDetailView;

});