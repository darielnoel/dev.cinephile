define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/actors/actorsListTemplate.html'
], function($, _, Backbone, actorsListTemplate) {

    //-------------------------------------------------------
    // Actor List View
    //-------------------------------------------------------

    var ActorsListView = Backbone.View.extend({
        el: $("#actors-list"),
        events: {

        },

        /**
         * Description
         * @method initialize
         * @param {} options
         * @return
         */
        initialize: function(options) {
            this.actorsCollection = options.actorsCollection;
        },

        /**
         * Description
         * @method render
         * @return
         */
        render: function() {
            var instance = this;

            //Sync Data
            instance.actorsCollection.fetch();

            //Caching the recent actors values
            var actors = instance.actorsCollection.models,
                template = _.template(actorsListTemplate, {
                    data: actors
                });

            instance.$el.html(template);
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

    return ActorsListView;
});
