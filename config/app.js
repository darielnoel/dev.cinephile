var CINEPHILEAPP_CONFIG = {
    View: {
        recentMovies: {
            className: 'RecentMovies'
        },

        moviesList: {
            className: 'MoviesList'
        },

        movieEdit: {
            className: 'MovieEdit'
        },

        actorsList: {
            className: 'ActorsList'
        },
        actorEdit: {
            className: 'ActorEdit'
        },
    },

    Routes: {
        homeAction: {
            controller: 'app',
            action: 'homeAction'
        },
        moviesAction: {
            controller: 'app',
            action: 'moviesAction'
        },
        moviesEditAction: {
            controller: 'app',
            action: 'moviesEditAction'
        },
        moviesNewAction: {
            controller: 'app',
            action: 'moviesNewAction'
        },
        actorsAction: {
            controller: 'app',
            action: 'actorsAction'
        },
        actorsEditAction: {
            controller: 'app',
            action: 'actorsEditAction'
        },
        actorsNewAction: {
            controller: 'app',
            action: 'actorsNewAction'
        },
    }
}