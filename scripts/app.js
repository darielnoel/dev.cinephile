$(function() {


    var CinephileApp = { //Custom namespace for Static class
            Model: {},
            View: {},
            Collection: {}
        },
        cinephileApp = {
            model: {},
            view: {},
            collection: {}
        }; //Custom namespace for Instances

    //Views
    CinephileApp.View.Main = Backbone.View.extend({
        el: $("#cinephileapp"),
        events: {

        },

        initialize: function() {
            //Creo las instancias de las clases que necesito
            cinephileApp.view.recentMovies = new CinephileApp.View.RecentMovies();
        },

        render: function() {
            cinephileApp.view.recentMovies.render();
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
            console.log('RecentMovies is rendered');
            console.log(cinephileApp.collection.movies.recents());

            //Caching the recent movies values
            var recentMovies = cinephileApp.collection.movies.recents(),
                template = _.template($('#movies-list-template').html(), {
                    data: recentMovies
                });

            instance.$el.html(template);
        }
    });

    //Models
    CinephileApp.Model.Movie = Backbone.Model.extend({
        defaults: function() {
            return {
                name: "Testing",
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

    //Model Collection
    CinephileApp.Collection.Movies = Backbone.Collection.extend({
        model: CinephileApp.Model.Movie,
        localStorage: new Backbone.LocalStorage("bb-movies"),

        //Return the last 10 added movies 
        recents: function() {
            return this.slice(-10);
        }
    });

    //TODO: Debe ir en el init del main app
    cinephileApp.collection.movies = new CinephileApp.Collection.Movies();

    //This code is for testing
    // var testModel = new CinephileApp.Model.Movie();
    // cinephileApp.collection.movies.add(testModel);
    // testModel.save();




    //Make Application
    // var AppView = Backbone.View.extend({
    //     el: $("#todoapp"),
    //     statsTemplate: _.template($("#stats-template").html()),
    //     events: {
    //         "keypress #new-todo": "createOnEnter",
    //         "click #clear-completed": "clearCompleted",
    //         "click #toggle-all": "toggleAllComplete"
    //     },

    //     initialize: function() {
    //         this.input = this.$("#new-todo");
    //         this.allCheckbox = this.$("#toggle-all")[0];

    //         this.listenTo(Todos, "add", this.addOne);
    //         this.listenTo(Todos, "reset", this.addAll);
    //         this.listenTo(Todos, "all", this.render);

    //         this.footer = this.$("footer");
    //         this.main = $("#main");

    //         Todos.fetch();
    //     },

    //     render: function() {
    //         var done = Todos.done().length;
    //         var remaining = Todos.remaining().length;

    //         if (Todos.length) {
    //             this.main.show();
    //             this.footer.show();
    //             this.footer.html(this.statsTemplate({
    //                 done: done,
    //                 remaining: remaining
    //             }));
    //         } else {
    //             this.main.hide();
    //             this.footer.hide();
    //         }

    //         this.allCheckbox.checked = !remaining;
    //     },

    //     addOne: function(todo) {
    //         var view = new TodoView({
    //             model: todo
    //         });
    //         this.$("#todo-list").append(view.render().el);
    //     },
    //     addAll: function() {
    //         Todos.each(this.addOne, this);
    //     },

    //     createOnEnter: function(e) {
    //         if (e.keyCode != 13) return;
    //         if (!this.input.val()) return;

    //         Todos.create({
    //             title: this.input.val()
    //         });
    //         this.input.val("");
    //     },
    //     clearCompleted: function() {
    //         _.invoke(Todos.done(), "destroy");
    //         return false;
    //     },

    //     toggleAllComplete: function() {
    //         var done = this.allCheckbox.checked;
    //         Todos.each(function(todo) {
    //             todo.save({
    //                 "done": done
    //             });
    //         });
    //     }

    // });




    /* Router */
    var Router = Backbone.Router.extend({
        routes: {
            "": "home"
        }
    });

    var router = new Router;
    router.on('route:home', function() {
        cinephileApp.view.main = new CinephileApp.View.Main();
        cinephileApp.view.main.render();
    })

    Backbone.history.start();

    //Define Model
    // var Todo = Backbone.Model.extend({
    //     defaults: function() {
    //         return {
    //             title: "no title...",
    //             order: Todos.nextOrder(),
    //             done: false
    //         };
    //     },
    //     toggle: function() {
    //         this.save({
    //             done: !this.get("done")
    //         });
    //     }
    // });

    //Model Collection
    // var TodoList = Backbone.Collection.extend({
    //     model: Todo,
    //     localStorage: new Backbone.LocalStorage("todos-backbone"),
    //     done: function() {
    //         return this.where({
    //             done: true
    //         });
    //     },
    //     remaining: function() {
    //         return this.without.apply(this, this.done());
    //     },
    //     nextOrder: function() {
    //         if (!this.length) return 1;
    //         return this.last().get("order") + 1;
    //     },
    //     comparator: 'order'
    // });
    // var Todos = new TodoList;

    //Model View & event action
    // var TodoView = Backbone.View.extend({
    //     tagName: "li",
    //     template: _.template($("#item-template").html()),
    //     events: {
    //         "click .toggle": "toggleDone",
    //         "dblclick .view": "edit",
    //         "click a.destroy": "clear",
    //         "keypress .edit": "updateOnEnter",
    //         "blur .edit": "close"
    //     },
    //     initialize: function() {
    //         this.listenTo(this.model, "change", this.render);
    //         this.listenTo(this.model, "destroy", this.remove);
    //     },
    //     render: function() {
    //         this.$el.html(this.template(this.model.toJSON()));
    //         this.$el.toggleClass("done", this.model.get("done"));
    //         this.input = this.$(".edit");
    //         return this;
    //     },
    //     toggleDone: function() {
    //         this.model.toggle();
    //     },
    //     edit: function() {
    //         this.$el.addClass("editing");
    //         this.input.focus();
    //     },
    //     close: function() {
    //         var value = this.input.val();
    //         if (!value) {
    //             this.clear();
    //         } else {
    //             this.model.save({
    //                 title: value
    //             });
    //             this.$el.removeClass("editing");
    //         }
    //     },
    //     updateOnEnter: function(e) {
    //         if (e.keyCode == 13) this.close();
    //     },
    //     clear: function() {
    //         this.model.destroy();
    //     }

    // });

    //Make Application
    // var AppView = Backbone.View.extend({
    //     el: $("#todoapp"),
    //     statsTemplate: _.template($("#stats-template").html()),
    //     events: {
    //         "keypress #new-todo": "createOnEnter",
    //         "click #clear-completed": "clearCompleted",
    //         "click #toggle-all": "toggleAllComplete"
    //     },

    //     initialize: function() {
    //         this.input = this.$("#new-todo");
    //         this.allCheckbox = this.$("#toggle-all")[0];

    //         this.listenTo(Todos, "add", this.addOne);
    //         this.listenTo(Todos, "reset", this.addAll);
    //         this.listenTo(Todos, "all", this.render);

    //         this.footer = this.$("footer");
    //         this.main = $("#main");

    //         Todos.fetch();
    //     },

    //     render: function() {
    //         var done = Todos.done().length;
    //         var remaining = Todos.remaining().length;

    //         if (Todos.length) {
    //             this.main.show();
    //             this.footer.show();
    //             this.footer.html(this.statsTemplate({
    //                 done: done,
    //                 remaining: remaining
    //             }));
    //         } else {
    //             this.main.hide();
    //             this.footer.hide();
    //         }

    //         this.allCheckbox.checked = !remaining;
    //     },

    //     addOne: function(todo) {
    //         var view = new TodoView({
    //             model: todo
    //         });
    //         this.$("#todo-list").append(view.render().el);
    //     },
    //     addAll: function() {
    //         Todos.each(this.addOne, this);
    //     },

    //     createOnEnter: function(e) {
    //         if (e.keyCode != 13) return;
    //         if (!this.input.val()) return;

    //         Todos.create({
    //             title: this.input.val()
    //         });
    //         this.input.val("");
    //     },
    //     clearCompleted: function() {
    //         _.invoke(Todos.done(), "destroy");
    //         return false;
    //     },

    //     toggleAllComplete: function() {
    //         var done = this.allCheckbox.checked;
    //         Todos.each(function(todo) {
    //             todo.save({
    //                 "done": done
    //             });
    //         });
    //     }

    // });
    // var App = new AppView;



}());