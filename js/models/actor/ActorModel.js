define([
    'underscore',
    'backbone'
], function(_, Backbone) {

    //-------------------------------------------------------
    // Movies Actors Model
    //-------------------------------------------------------

    var ActorModel = Backbone.Model.extend({
        defaults: function() {
            return {
                firstName: "",
                lastName: "",
                gender: "",
                birthDate: "",
                movieCollection: "",
                image:""
            };
        }
    });

    return ActorModel;

});
