define([
    'jquery',
    'jquerySerialize',
    'underscore',
    'backbone',
    'models/actor/ActorModel',
    'text!templates/actors/actorEditTemplate.html',
], function($, jquerySerialize, _, Backbone, ActorModel, actorEditTemplate) {

    var ActorEditView = Backbone.View.extend({
        el: $("#actor-edit"),
        events: {
            'submit .actors-edit-form': 'saveItem',
            'click .delete': 'deleteItem',
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
                        var template = _.template(actorEditTemplate, {
                            data: data
                        });
                        instance.$el.html(template);
                    }
                });
            } else {
                actor = new ActorModel();
                instance.model = actor;
                template = _.template(actorEditTemplate, {
                    data: actor
                });
                instance.$el.html(template);
            }

            instance.show();
        },

        saveItem: function(e) {
            var instance = this,
                details = $(e.currentTarget).serializeObject();

            if (details.cid) {
                instance.actorsCollection.add(instance.model);
            }

            instance.model.save(details, {
                success: function(data) {
                    instance.router.navigate('actors', {
                        trigger: true
                    });
                }
            });

            return false;
        },
        cancelItem: function(e) {
            this.router.navigate('actors', {
                trigger: true
            });
        },
        deleteItem: function(e) {
            var instance = this;

            instance.model.destroy({
                success: function() {
                    instance.router.navigate('actors', {
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

    return ActorEditView;

});