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
        },

        getByNameSubstr: function(NameSubstr){
            var actorsCollection = this,
                foundedActors;
            
            if(!NameSubstr){
                foundedActors = actorsCollection.models;
            } else{
                foundedActors = actorsCollection.filter(function(item){
                    return item.get('firstName').indexOf(NameSubstr) >= 0;
                });                
            }    
            return foundedActors;
        }

    });

    return ActorsCollection;

});