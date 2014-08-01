define([
    'jquery',
    'jquerySerialize',
    'underscore',
    'backbone',
    'bootstrap'
], function($, jquerySerialize, _, Backbone, bootstrap) {

    var AppSearchBoxView = Backbone.View.extend({
        el: $("#search-box"),
        events: {
            'submit': 'searchAction',
        },

        initialize: function(options) {
            this.router = options.router;
        },

        render: function() {
            var instance = this;
            console.log('AppSearchBoxView render');
               instance.$el.on( 'click', '.dropdown-menu li', function( event ) {
                    var $target = $( event.currentTarget );

                  $target.closest( '.input-group-btn' )
                     .find( '[data-bind="label"]' ).text( $target.text() )
                        .end()
                     .children( '.dropdown-toggle' ).dropdown( 'toggle' );

                  return false;

               });
        },

        syncUI: function(data){
            var instance = this;

            instance.$el.find( '[data-bind="label"]' ).text(data.selected);
            instance.$el.find( '[name="query"]' ).val(data.query);


        },

        searchAction: function(e){
            var instance = this;

            console.log('searchAction');
            var details = $(e.currentTarget).serializeObject(),
                query;

            details.category = instance.$el.find( '[data-bind="label"]' ).text().toLowerCase(); 

            query = details.category + '&' + details.query; 

            instance.router.navigate('search/' + query, {
                trigger: true
            });

            return false;
        },

        hide: function() {
            $(this.el).hide();
        },

        show: function() {
            this.$el.show();
        }
    });

    return AppSearchBoxView;
});