define([
    'underscore',
    'backbone'
], function(_, Backbone) {

    var MovieModel = Backbone.Model.extend({
        defaults: function() {
            return {
                name: "",
                releaseYear: "",
                grossIncome: "",
                directorName: "",
                rating: "",
                genere: [],
                actorCollection: [],
            };
        }
    });

    return MovieModel;

});