define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/actors/actorsListTemplate.html'
], function($, _, Backbone, actorsListTemplate) {

    var ActorsListView = Backbone.View.extend({
        el: $("#actors-list"),
        events: {

        },

        initialize: function(options) {
            this.actorsCollection = options.actorsCollection;
        },

        render: function() {
            var instance = this;

            //Sync Data
            this.actorsCollection.fetch();

            //Caching the recent actors values
            var actors = this.actorsCollection.models,
                template = _.template(actorsListTemplate, {
                    data: actors
                });

            instance.$el.html(template);
            this.show();
        },

        hide: function() {
            this.$el.hide();
        },

        show: function() {
            this.$el.show();
        }
    });

    return ActorsListView;
});
