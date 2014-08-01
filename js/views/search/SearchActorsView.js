define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/search/searchActorsListTemplate.html'
], function($, _, Backbone, searchActorsListTemplate) {

    //-------------------------------------------------------
    // Search Actors View
    //-------------------------------------------------------

    var SearchActorsView = Backbone.View.extend({
        el: $("#search-actors-list"),
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
         * @param {} options
         * @return 
         */
        render: function(options) {
            //Sync Data
            this.actorsCollection.fetch();

            var instance = this,
                actors = instance.actorsCollection.getByNameSubstr(options.query),
                template = _.template(searchActorsListTemplate, {
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

    return SearchActorsView;
});
