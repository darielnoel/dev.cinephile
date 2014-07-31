define([
    'jquery',
    'jquerySerialize',
    'underscore',
    'backbone',
    'models/movie/MovieModel',
    'text!templates/movies/movieEditTemplate.html',
    'text!templates/movies/movieActorsListTemplate.html',
    'text!templates/movies/movieToAddActorListTemplate.html',
    'text!templates/actors/actorsTrTemplate.html',
], function($, jquerySerialize, _, Backbone, MovieModel, movieEditTemplate, movieActorsListTemplate, movieToAddActorListTemplate, actorsTrTemplate) {

    var MovieEditView = Backbone.View.extend({
        el: $("#movie-edit"),
        events: {
            'submit .movies-edit-form': 'saveItem',
            'click .delete': 'deleteItem',
            'click .cancel': 'cancelItem',
            'click .delete-actor-from-movie': 'deleteActorFromMovie',
            'click .show-actor-to-movie': 'showActorToMovieView',
            'click .add-actor-to-movie': 'addActorToMovie',
            'click .close-actor-to-movie': 'closeActorToMovieView',
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
                        var template = _.template(movieEditTemplate, {
                            data: data
                        });
                        instance.$el.html(template);

                        instance.actorsCollection.fetch();
                        var movieActors = [],
                            actorInstance,
                            actualActors = [];
  
                        _.each(instance.model.get('actorCollection'), function(item) {
                            actorInstance = instance.actorsCollection.get(item);
                            if(actorInstance){
                                movieActors.push(instance.actorsCollection.get(item));
                                actualActors.push(item);
                            } 
       
                        });

                        instance.model.set('actorCollection', actualActors);
                        instance.model.save(); 

                        var templateActors = _.template(movieActorsListTemplate, {
                            data: movieActors
                        });

                        instance.$el.find('.movie-actor-list').prepend(templateActors);

                    }
                });
            } else {
                movie = new MovieModel();
                this.model = movie;
                template = _.template(movieEditTemplate, {
                    data: movie
                });
                this.$el.html(template);
            }

            this.show();
        },

        deleteActorFromMovie: function(e) {
            var node = $(e.currentTarget),
                actorID = node.attr('data-id'),
                currentActorCollection = this.model.get('actorCollection');

            currentActorCollection = _.without(currentActorCollection, actorID);
            this.model.set('actorCollection', currentActorCollection);
            node.parents("tr").remove();

        },

        showActorToMovieView: function(e) {
            this.actorsCollection.fetch();

            var rootElement = this.$el,
                actorsCollection = this.actorsCollection.models,
                template = _.template(movieToAddActorListTemplate, {
                    data: actorsCollection
                });

            rootElement.find('.movie-toadd-actor-list').html(template);
            rootElement.find('.movie-form').hide();
            rootElement.find('.movie-toadd-actor-list').show();
            $(e.currentTarget).hide();
            rootElement.find('.close-actor-to-movie').show();

        },

        closeActorToMovieView: function(e) {
            var rootElement = this.$el;

            rootElement.find('.movie-form').show();
            rootElement.find('.movie-toadd-actor-list').hide();
            $(e.currentTarget).hide();
            rootElement.find('.close-actor-to-movie').hide();
            rootElement.find('.show-actor-to-movie').show();
        },


        addActorToMovie: function(e) {
            var node = $(e.currentTarget),
                actorID = node.attr('data-id'),
                currentActorCollection = this.model.get('actorCollection');

            if (!_.contains(currentActorCollection, actorID)) {
                currentActorCollection.push(actorID);
                actorModel = this.actorsCollection.get(actorID);

                //Renderizo una plantilla
                template = _.template(actorsTrTemplate, {
                    data: actorModel
                });

                this.$el.find('.movie-actor-list table tbody').append(template);
            }
        },

        saveItem: function(e) {
            var instance = this,
                details = $(e.currentTarget).serializeObject();

            if (details.cid) {
                instance.moviesCollection.add(instance.model);
            }

            instance.model.save(details, {
                success: function(data) {
                    instance.router.navigate('movies', {
                        trigger: true
                    });
                }
            });

            return false;
        },
        cancelItem: function(e) {
            this.router.navigate('movies', {
                trigger: true
            });
        },
        deleteItem: function(e) {
            var instance = this;
            instance.model.destroy({
                success: function() {
                    instance.router.navigate('movies', {
                        trigger: true
                    });
                }
            })
        },

        hide: function() {
            this.$el.hide();
        },

        show: function() {
            this.$el.show();
        }
    });

    return MovieEditView;

});