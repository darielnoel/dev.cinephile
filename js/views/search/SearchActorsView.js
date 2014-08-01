define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/search/searchActorsListTemplate.html'
], function($, _, Backbone, searchActorsListTemplate) {

    var SearchActorsView = Backbone.View.extend({
        el: $("#search-actors-list"),
        events: {

        },

        initialize: function(options) {
            this.actorsCollection = options.actorsCollection;
        },

        render: function(options) {
            var instance = this;

            //Sync Data
            this.actorsCollection.fetch();

            //Caching the recent actors values
            var actors = this.actorsCollection.getByNameSubstr(options.query),
                template = _.template(searchActorsListTemplate, {
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

    return SearchActorsView;
});
