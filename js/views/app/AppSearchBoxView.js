define([
    'jquery',
    'jquerySerialize',
    'underscore',
    'backbone',
    'bootstrap'
], function($, jquerySerialize, _, Backbone, bootstrap) {

    //-------------------------------------------------------
    // App SearchBox View
    //-------------------------------------------------------

    var AppSearchBoxView = Backbone.View.extend({
        el: $("#search-box"),
        events: {
            'submit': 'searchAction',
        },

        /**
         * Description
         * @method initialize
         * @param {} options
         * @return
         */
        initialize: function(options) {
            this.router = options.router;
        },

        /**
         * Description
         * @method render
         * @return
         */
        render: function() {
            var instance = this;
            instance.$el.on('click', '.dropdown-menu li', function(event) {
                var $target = $(event.currentTarget);

                $target.closest('.input-group-btn')
                    .find('[data-bind="label"]').text($target.find('a').text())
                    .end()
                    .children('.dropdown-toggle').dropdown('toggle');

                return false;

            });
        },

        /**
         * Sync the UI with external changes
         * @method syncUI
         * @param {} data
         * @return
         */
        syncUI: function(data) {
            var instance = this,
                viewSrcNode = instance.$el;

            viewSrcNode.find('[data-bind="label"]').text(data.selected);
            viewSrcNode.find('[name="query"]').val(data.query);
        },

        /**
         * Search Action Handle
         * @method searchAction
         * @param {} e
         * @return Literal
         */
        searchAction: function(e) {
            var instance = this,
                details = $(e.currentTarget).serializeObject(),
                query;

            details.category = instance.$el.find('[data-bind="label"]').text().toLowerCase();

            query = details.category + '&' + details.query;

            instance.router.navigate('search/' + query, {
                trigger: true
            });

            return false;
        },

        /**
         * Description
         * @method hide
         * @return
         */
        hide: function() {
            $(this.el).hide();
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

    return AppSearchBoxView;
});
