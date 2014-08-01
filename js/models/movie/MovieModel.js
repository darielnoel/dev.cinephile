define([
    'underscore',
    'backbone'
], function(_, Backbone) {

    //-------------------------------------------------------
    // Statics vars
    //-------------------------------------------------------
    
    var RATES_TOTAL_VOTES = 'ratesTotalVotes',
        RATES_COUNT = 'ratesCount';


    //-------------------------------------------------------
    // Movie Model
    //-------------------------------------------------------

    var MovieModel = Backbone.Model.extend({

        /**
         * Custom getter
         * @method get
         * @param {} attr
         * @return CallExpression
         */
        get: function(attr) {
            var instance = this;

            if (typeof instance[attr] == 'function') {
                return instance[attr]();
            }
            return Backbone.Model.prototype.get.call(instance, attr);
        },

        /**
         * Custom rating getter
         * @method rating
         * @return BinaryExpression
         */
        rating: function() {
            var instance = this;
            return parseInt(instance.get(RATES_TOTAL_VOTES)) / parseInt(instance.get(RATES_COUNT));
        },

        /**
         * Custom rating setter
         * @method setRating
         * @param {} value
         * @return
         */
        setRating: function(value) {
            var instance = this;

            instance.set(RATES_COUNT, parseInt(instance.get(RATES_COUNT)) + 1);
            instance.set(RATES_TOTAL_VOTES, parseInt(instance.get(RATES_TOTAL_VOTES)) + parseInt(value));
        },

        ratesCount: 1,
        ratesTotalVotes: 5,

        /**
         * Description
         * @method defaults
         * @return ObjectExpression
         */
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
