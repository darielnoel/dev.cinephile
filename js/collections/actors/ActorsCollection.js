define([
    'underscore',
    'backboneLocalStorage',
    'backbone',
    'models/actor/ActorModel'
], function(_, backboneLocalStorage, Backbone, ActorModel) {

    //Movies Model Collection
    ActorsCollection = Backbone.Collection.extend({
        model: ActorModel,
        localStorage: new Backbone.LocalStorage("bb-actors"),

        //Return the last 10 added Actors 
        recents: function() {
            return this.models.slice(-10);
        }

    });

    return ActorsCollection;

});