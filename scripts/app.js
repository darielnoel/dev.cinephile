$(function() {

    //Custom namespace for Static class
    var CinephileApp = {
            Model: {},
            View: {},
            Collection: {},
            Controller: {},
            Config: CINEPHILEAPP_CONFIG,
        },
        cinephileApp = {
            model: {},
            view: {},
            collection: {},
            controller: {},
            util: {}
        }; //Custom namespace for Instances

    /* Router */
    var Router = Backbone.Router.extend({
        routes: {
            "": "homeAction",
            "movies": "moviesAction",
            "movies/edit/:id": "moviesEditAction",
            "movies/new": "moviesNewAction",
            "actors": "actorsAction",
            "actors/edit/:id": "actorsEditAction",
            "actors/new": "actorsNewAction",
        },

        settingRoutes: function(routes) {
            var configRoutes = CINEPHILEAPP_CONFIG.Routes;

            _.each(configRoutes, function(value, key) {
                this.on('route:' + key, cinephileApp.controller[value.controller][key]);
            }, this);
        }
    });


    cinephileApp.init = function() {

        //Init Controller
        cinephileApp.controller.app = new CinephileApp.Controller.App();

        //Create Collection
        cinephileApp.collection.movies = new CinephileApp.Collection.Movies();
        cinephileApp.collection.actors = new CinephileApp.Collection.Actors();

        //Init Router
        cinephileApp.util.router = new Router();

        cinephileApp.util.router.settingRoutes({});

        cinephileApp.view.main = new CinephileApp.View.Main();
        cinephileApp.view.main.render();

        Backbone.history.start();

    }



    //Views
    CinephileApp.View.Main = Backbone.View.extend({
        el: $("#cinephileapp"),
        events: {

        },

        initialize: function() {
            //Creo las instancias de las clases que necesito
            //cinephileApp.view.recentMovies = new CinephileApp.View.RecentMovies();
        },

        render: function() {
            //cinephileApp.view.recentMovies.render();
            //this.show();
        },

        hide: function() {
            $(this.el).hide();
        },

        show: function() {
            this.$el.show();
        }
    });

    CinephileApp.View.RecentMovies = Backbone.View.extend({
        el: $("#recent-movies"),
        events: {

        },

        initialize: function() {
            //Creo las instancias de las clases que necesito
            cinephileApp.collection.movies.fetch();

        },

        render: function() {
            var instance = this;

            //Caching the recent movies values
            var recentMovies = cinephileApp.collection.movies.recents(),
                template = _.template($('#movies-thumbails-template').html(), {
                    data: recentMovies
                });

            instance.$el.html(template);
            this.show();
        },

        hide: function() {
            $(this.el).hide();
        },

        show: function() {
            this.$el.show();
        }
    });

    CinephileApp.View.MoviesList = Backbone.View.extend({
        el: $("#movies-list"),
        events: {

        },

        initialize: function() {},

        render: function() {
            var instance = this;

            //Sync Data
            cinephileApp.collection.movies.fetch();

            //Caching the recent movies values
            var movies = cinephileApp.collection.movies.models,
                template = _.template($('#movies-list-template').html(), {
                    data: movies
                });

            instance.$el.html(template);
            this.show();
        },

        hide: function() {
            this.$el.hide();
        },

        show: function() {
            this.$el.show();
        }
    });

    CinephileApp.View.MovieEdit = Backbone.View.extend({
        el: $("#movie-edit"),
        events: {
            'submit .movies-edit-form': 'saveItem',
            'click .delete': 'deleteItem',
            'click .cancel': 'cancelItem'
        },
        model: {},

        initialize: function() {
            //Creo las instancias de las clases que necesito

        },

        render: function(id) {
            var instance = this,
                template,
                movie;
            cinephileApp.collection.movies.fetch();

            if (id) {
                //Caching the recent movies values
                movie = cinephileApp.collection.movies.get(id);
                this.model = movie;

                this.model.fetch({
                    success: function(data) {
                        var template = _.template($('#movie-edit-template').html(), {
                            data: data
                        });
                        instance.$el.html(template);
                    }
                });
            } else {
                movie = new CinephileApp.Model.Movie();
                this.model = movie;
                template = _.template($('#movie-edit-template').html(), {
                    data: movie
                });
                this.$el.html(template);
            }

            this.show();
        },

        saveItem: function(e) {
            var details = $(e.currentTarget).serializeObject();
            if (details.cid) {
                cinephileApp.collection.movies.add(this.model);
            }

            this.model.save(details, {
                success: function(data) {
                    cinephileApp.util.router.navigate('movies', {
                        trigger: true
                    });
                }
            });

            return false;
        },
        cancelItem: function(e) {
            cinephileApp.util.router.navigate('movies', {
                trigger: true
            });
        },
        deleteItem: function(e) {
            this.model.destroy({
                success: function() {
                    cinephileApp.util.router.navigate('movies', {
                        trigger: true
                    });
                }
            })
        },

        hide: function() {
            this.$el.hide();
        },

        show: function() {
            this.$el.show();
        }
    });

    CinephileApp.View.ActorsList = Backbone.View.extend({
        el: $("#actors-list"),
        events: {

        },

        initialize: function() {},

        render: function() {
            var instance = this;

            //Sync Data
            cinephileApp.collection.actors.fetch();

            //Caching the recent actors values
            var actors = cinephileApp.collection.actors.models,
                template = _.template($('#actors-list-template').html(), {
                    data: actors
                });

            instance.$el.html(template);
            this.show();
        },

        hide: function() {
            this.$el.hide();
        },

        show: function() {
            this.$el.show();
        }
    });

    CinephileApp.View.ActorEdit = Backbone.View.extend({
        el: $("#actor-edit"),
        events: {
            'submit .actors-edit-form': 'saveItem',
            'click .delete': 'deleteItem',
            'click .cancel': 'cancelItem'
        },
        model: {},

        initialize: function() {
            //Creo las instancias de las clases que necesito

        },

        render: function(id) {
            var instance = this,
                template,
                actor;
            cinephileApp.collection.actors.fetch();

            if (id) {
                //Caching the recent actors values
                actor = cinephileApp.collection.actors.get(id);
                this.model = actor;

                this.model.fetch({
                    success: function(data) {
                        var template = _.template($('#actor-edit-template').html(), {
                            data: data
                        });
                        instance.$el.html(template);
                    }
                });
            } else {
                actor = new CinephileApp.Model.Actor();
                this.model = actor;
                template = _.template($('#actor-edit-template').html(), {
                    data: actor
                });
                this.$el.html(template);
            }

            this.show();
        },

        saveItem: function(e) {
            var details = $(e.currentTarget).serializeObject();
            if (details.cid) {
                cinephileApp.collection.actors.add(this.model);
            }

            this.model.save(details, {
                success: function(data) {
                    cinephileApp.util.router.navigate('actors', {
                        trigger: true
                    });
                }
            });

            return false;
        },
        cancelItem: function(e) {
            cinephileApp.util.router.navigate('actors', {
                trigger: true
            });
        },
        deleteItem: function(e) {
            this.model.destroy({
                success: function() {
                    cinephileApp.util.router.navigate('actors', {
                        trigger: true
                    });
                }
            })
        },

        hide: function() {
            this.$el.hide();
        },

        show: function() {
            this.$el.show();
        }
    });


    //Models
    CinephileApp.Model.Movie = Backbone.Model.extend({
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

        //Another model custom methods
    });

    CinephileApp.Model.Actor = Backbone.Model.extend({
        defaults: function() {
            return {
                firstName: "",
                lastName: "",
                gender: "",
                birthDate: "",
                movieCollection: ""
            };
        }

        //Another model custom methods
    });

    //Movies Model Collection
    CinephileApp.Collection.Movies = Backbone.Collection.extend({
        model: CinephileApp.Model.Movie,
        localStorage: new Backbone.LocalStorage("bb-movies"),

        //Return the last 10 added movies 
        recents: function() {
            return this.slice(-10);
        }

    });

    //Actors Model Collection
    CinephileApp.Collection.Actors = Backbone.Collection.extend({
        model: CinephileApp.Model.Actor,
        localStorage: new Backbone.LocalStorage("bb-actors"),

        //Return the last 10 added movies 
        recents: function() {
            return this.slice(-10);
        }

    });





    //Controller
    CinephileApp.Controller.App = function() {

        var api = {},
            instance = this;

        api.homeAction = function(options) {
            api.showViewHelper('recentMovies');
        }

        api.moviesAction = function(options) {
            api.showViewHelper('moviesList');
        }

        api.moviesEditAction = function(options) {
            api.showViewHelper('movieEdit', options);
        }

        api.moviesNewAction = function(options) {
            api.showViewHelper('movieEdit', options);
        }

        api.actorsAction = function(options) {
            api.showViewHelper('actorsList');
        }
        api.actorsEditAction = function(options) {
            api.showViewHelper('actorEdit', options);
        }

        api.actorsNewAction = function(options) {
            api.showViewHelper('actorEdit', options);
        }

        api.showViewHelper = function(viewID, options) {
            var viewInstances = cinephileApp.view;
            if (!viewInstances[viewID]) {
                var className = CinephileApp.Config.View[viewID].className;
                viewInstances[viewID] = new CinephileApp.View[className]();
            }

            _.each(viewInstances, function(value, key) {
                if (key !== viewID && key !== 'main') {
                    value.hide();
                }
            })

            viewInstances[viewID].render(options);
        }

        return api;
    }

    cinephileApp.init();

    /* jQuery plugin to turn form into JSON 
   http://stackoverflow.com/questions/1184624/convert-form-data-to-js-object-with-jquery */
    $.fn.serializeObject = function() {
        var o = {};
        var a = this.serializeArray();
        $.each(a, function() {
            if (o[this.name] !== undefined) {
                if (!o[this.name].push) {
                    o[this.name] = [o[this.name]];
                }
                o[this.name].push(this.value || '');
            } else {
                o[this.name] = this.value || '';
            }
        });
        return o;
    };

    //This code is for testing
    // var testModel = new CinephileApp.Model.Movie();
    // cinephileApp.collection.movies.add(testModel);
    // testModel.save();

}());