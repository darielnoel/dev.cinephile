define([
    'jquery',
    'jquerySerialize',
    'jqueyStarRating',
    'underscore',
    'backbone',
    'models/movie/MovieModel',
    'text!templates/movies/movieDetailTemplate.html',
    'text!templates/movies/movieDetailActorsListTemplate.html',
    'text!templates/movies/moviesRelatesTemplate.html'
], function($, jquerySerialize, jqueyStarRating, _, Backbone, MovieModel, movieDetailTemplate, movieDetailActorsListTemplate, moviesRelatesTemplate) {

    //-------------------------------------------------------
    // Movie Detail View
    //-------------------------------------------------------

    var MovieDetailView = Backbone.View.extend({
        el: $("#movie-detail"),
        events: {
            'click .cancel': 'cancelItem',
        },
        model: {},

        /**
         * Description
         * @method initialize
         * @param {} options
         * @return
         */
        initialize: function(options) {
            var instance = this;

            instance.moviesCollection = options.moviesCollection;
            instance.actorsCollection = options.actorsCollection;
            instance.router = options.router;
        },

        /**
         * Description
         * @method render
         * @param {} options
         * @return
         */
        render: function(options) {
            var instance = this,
                template,
                movie,
                id = options.id,
                viewSrcNode = instance.$el;

            instance.moviesCollection.fetch();

            if (id) {

                //Caching the recent movies values
                movie = instance.moviesCollection.get(id);
                instance.model = movie;

                instance.model.fetch({

                    success: function(data) {
                        var template = _.template(movieDetailTemplate, {
                                data: data
                            }),
                            movieActors = [],
                            templateActors,
                            templateRelatesMovies,
                            relatesMovies;

                        viewSrcNode.html(template);

                        var ratingNode = viewSrcNode.find('.rating');
                        ratingNode.rating();

                        ratingNode.on('rating.change', function(event, value, caption) {
                            instance.model.setRating(value);
                            instance.model.save();
                            ratingNode.rating('update', instance.model.get('rating'));
                        });

                        //Actors
                        instance.actorsCollection.fetch();
                        _.each(instance.model.get('actorCollection'), function(item) {
                            movieActors.push(instance.actorsCollection.get(item));
                        });

                        templateActors = _.template(movieDetailActorsListTemplate, {
                            data: movieActors
                        });

                        viewSrcNode.find('.movie-actor-list').html(templateActors);

                        //Relates Movies
                        relatesMovies = instance.moviesCollection.getRelatesMovies(id);
                        console.log(relatesMovies);

                        templateRelatesMovies = _.template(moviesRelatesTemplate, {
                            data: relatesMovies
                        });

                        viewSrcNode.find('.relates-movies-list').html(templateRelatesMovies);
                        

                        

                    }
                });
            }
            viewSrcNode.find('#files').change($.proxy(instance.handleFileSelect, instance));
            instance.show();
        },

        handleFileSelect: function(evt) {
            var instance = this,
                viewSrcNode = instance.$el;

            console.log('handleFileSelect');
            var files = evt.target.files; // FileList object

            // Loop through the FileList and render image files as thumbnails.
            for (var i = 0, f; f = files[i]; i++) {

              // Only process image files.
              if (!f.type.match('image.*')) {
                continue;
              }

              var reader = new FileReader();

              // Closure to capture the file information.
              reader.onload = (function(theFile) {
                return function(e) {
                  // Render thumbnail.
                  console.log(viewSrcNode.find('#store-image img'));
                  viewSrcNode.find('#store-image img').attr('src', e.target.result);
                  instance.model.set('image', e.target.result);
                };
              })(f);

              // Read in the image file as a data URL.
              reader.readAsDataURL(f);
            }
        },

        /**
         * Back to the movies Views
         * @method cancelItem
         * @param {} e
         * @return
         */
        cancelItem: function(e) {
            this.router.navigate('movies', {
                trigger: true
            });
        },

        /**
         * Description
         * @method hide
         * @return
         */
        hide: function() {
            this.$el.hide();
        },

        /**
         * Description
         * @method show
         * @return
         */
        show: function() {
            this.$el.show();
        }
    });

    return MovieDetailView;

});
