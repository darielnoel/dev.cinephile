define([
    'underscore',
    'backbone'
], function(_, Backbone) {

    var ActorModel = Backbone.Model.extend({
        defaults: function() {
            return {
                firstName: "",
                lastName: "",
                gender: "",
                birthDate: "",
                movieCollection: ""
            };
        }
    });

    return ActorModel;

});