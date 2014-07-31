define([
    'underscore',
    'backbone'
], function(_, Backbone) {

    var MovieModel = Backbone.Model.extend({
        //Custom getter
        get: function (attr) {
            if (typeof this[attr] == 'function') {
              return this[attr]();
            }
            return Backbone.Model.prototype.get.call(this, attr);
        },
        rating: function() {
            return parseInt(this.get('ratesTotalVotes'))/parseInt(this.get('ratesCount'));
        },

        setRating: function(value){
            this.set('ratesCount', parseInt(this.get('ratesCount')) + 1);
            this.set('ratesTotalVotes', parseInt(this.get('ratesTotalVotes')) + parseInt(value));
        },
        ratesCount: 1,
        ratesTotalVotes: 5,
        defaults: function() {
            return {
                name: "",
                releaseYear: "",
                grossIncome: "",
                directorName: "",
                ratesCount: 1,
                ratesTotalVotes: 5,
                genere: [],
                actorCollection: [],
            };
        }
    });

    return MovieModel;

});