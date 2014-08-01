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

    //-------------------------------------------------------
    // Static vars
    //-------------------------------------------------------
    
    var ACTOR_COLLECTION = 'actorCollection',
        MOVIES = 'movies';

    //-------------------------------------------------------
    // Movie Edit View
    //-------------------------------------------------------

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
                id = options.id,
                viewSrcNode = instance.$el;

            instance.moviesCollection.fetch();

            if (id) {
                //Caching the recent movies values
                movie = instance.moviesCollection.get(id);
                instance.model = movie;

                instance.model.fetch({
                    success: function(data) {
                        var template = _.template(movieEditTemplate, {
                                data: data
                            }),
                            movieActors = [],
                            actorInstance,
                            actualActors = [],
                            templateActors;

                        viewSrcNode.html(template);

                        instance.actorsCollection.fetch();

                        _.each(instance.model.get(ACTOR_COLLECTION), function(item) {
                            actorInstance = instance.actorsCollection.get(item);
                            if (actorInstance) {
                                movieActors.push(instance.actorsCollection.get(item));
                                actualActors.push(item);
                            }

                        });

                        instance.model.set(ACTOR_COLLECTION, actualActors);
                        instance.model.save();

                        templateActors = _.template(movieActorsListTemplate, {
                            data: movieActors
                        });

                        viewSrcNode.find('.movie-actor-list').prepend(templateActors);

                    }
                });
            } else {
                movie = new MovieModel();
                instance.model = movie;
                template = _.template(movieEditTemplate, {
                    data: movie
                });
                viewSrcNode.html(template);
            }

            instance.show();
        },

        /**
         * Delete Actor From a Movie
         * @method deleteActorFromMovie
         * @param {} e
         * @return
         */
        deleteActorFromMovie: function(e) {
            var instance = this,
                node = $(e.currentTarget),
                actorID = node.attr('data-id'),
                currentActorCollection = instance.model.get(ACTOR_COLLECTION);

            currentActorCollection = _.without(currentActorCollection, actorID);
            instance.model.set(ACTOR_COLLECTION, currentActorCollection);
            node.parents("tr").remove();

        },

        /**
         * Show ActorToMovie Widget
         * @method showActorToMovieView
         * @param {} e
         * @return
         */
        showActorToMovieView: function(e) {
            this.actorsCollection.fetch();

            var instance = this,
                viewSrcNode = instance.$el,
                actorsCollection = instance.actorsCollection.models,
                template = _.template(movieToAddActorListTemplate, {
                    data: actorsCollection
                }),
                movieToAddActorListNode = viewSrcNode.find('.movie-toadd-actor-list');

            movieToAddActorListNode.html(template);
            viewSrcNode.find('.movie-form').hide();
            movieToAddActorListNode.show();
            $(e.currentTarget).hide();
            viewSrcNode.find('.close-actor-to-movie').show();

        },

        /**
         * Close ActorToMovie Widget
         * @method closeActorToMovieView
         * @param {} e
         * @return
         */
        closeActorToMovieView: function(e) {
            var viewSrcNode = this.$el;

            viewSrcNode.find('.movie-form').show();
            viewSrcNode.find('.movie-toadd-actor-list').hide();
            $(e.currentTarget).hide();
            viewSrcNode.find('.close-actor-to-movie').hide();
            viewSrcNode.find('.show-actor-to-movie').show();
        },


        /**
         * Add an actor to the Edited Movie
         * @method addActorToMovie
         * @param {} e
         * @return
         */
        addActorToMovie: function(e) {
            var instance = this,
                node = $(e.currentTarget),
                actorID = node.attr('data-id'),
                currentActorCollection = instance.model.get(ACTOR_COLLECTION),
                template,
                actorModel;

            if (!_.contains(currentActorCollection, actorID)) {
                currentActorCollection.push(actorID);
                actorModel = instance.actorsCollection.get(actorID);

                //Renderizo una plantilla
                template = _.template(actorsTrTemplate, {
                    data: actorModel
                });

                instance.$el.find('.movie-actor-list table tbody').append(template);
            }
        },

        /**
         * Persist the changes in to the model
         * @method saveItem
         * @param {} e
         * @return Literal
         */
        saveItem: function(e) {
            var instance = this,
                details = $(e.currentTarget).serializeObject();

            if (details.cid) {
                instance.moviesCollection.add(instance.model);
            }

            instance.model.save(details, {
                success: function(data) {
                    instance.router.navigate(MOVIES, {
                        trigger: true
                    });
                }
            });

            return false;
        },

        /**
         * Back to the Movies List View
         * @method cancelItem
         * @param {} e
         * @return
         */
        cancelItem: function(e) {
            this.router.navigate(MOVIES, {
                trigger: true
            });
        },

        /**
         * Delete the Movie
         * @method deleteItem
         * @param {} e
         * @return
         */
        deleteItem: function(e) {
            var instance = this;
            instance.model.destroy({
                success: function() {
                    instance.router.navigate(MOVIES, {
                        trigger: true
                    });
                }
            })
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

    return MovieEditView;

});
