define([
    'jquery',
    'jquerySerialize',
    'underscore',
    'backbone',
    'models/actor/ActorModel',
    'text!templates/actors/actorEditTemplate.html',
], function($, jquerySerialize, _, Backbone, ActorModel, actorEditTemplate) {

    //-------------------------------------------------------
    // Actor Edit View
    //-------------------------------------------------------

    var ActorEditView = Backbone.View.extend({
        el: $("#actor-edit"),
        events: {
            'submit .actors-edit-form': 'saveItem',
            'click .delete': 'deleteItem',
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
                id = options.id,
                viewSrcNode = instance.$el;
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
                        viewSrcNode.html(template);
                    }
                });
            } else {
                actor = new ActorModel();
                instance.model = actor;
                template = _.template(actorEditTemplate, {
                    data: actor
                });
                viewSrcNode.html(template);
            }

            instance.show();
        },

        /**
         * Save the item changes to the models
         * @method saveItem
         * @param {} e
         * @return Literal
         */
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

        /**
         * Cancel the Edition
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
         * @method deleteItem
         * @param {} e
         * @return
         */
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

    return ActorEditView;

});
